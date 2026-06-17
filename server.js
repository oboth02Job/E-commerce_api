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


app.use(cors)
app.use(express.json())

app.use("/", (req, res) => {
res.send("Hello from the server")
})

app.use("/categories", require("./routes/categoriesRoutes"));
app.use("/orders", require("./routes/ordersRoutes"));
app.use("/products", require("./routes/productsRoutes"));
app.use("/users", require("./routes/usersRoutes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`The server is running on port: ${port}`);
    });
  }
});