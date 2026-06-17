const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const categoriesRoutes = require("./routes/categoriesRoutes")
const ordersRoutes = require("./routes/ordersRoutes");
const usersRoutes = require("./routes/usersRoutes");
const productsRoutes = require("./routes/productsRoutes");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongodb = require("./data/database");
const passport = require("passport");
const session = require("express-session");
const githubStrategy = require("passport-github2").Strategy;
require("./config/passport");
const authRoutes = require("./routes/authRoutes");


app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.mySecretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
    },
  }),
);


 app.use(cors())
 app.use(express.json())

 app.use(passport.initialize());
 app.use(passport.session());

 app.use("/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use("/api-docs", require("./routes/swagger"));
app.use("/categories", require("./routes/categoriesRoutes"));
app.use("/orders", require("./routes/ordersRoutes"));
app.use("/products", require("./routes/productsRoutes"));
app.use("/users", require("./routes/usersRoutes"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  next();
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`The server is running on port: ${port}`);
    });
  }
});