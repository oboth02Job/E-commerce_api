const mongodb = require("../data/database.js");
const ObjectId = require("mongodb").ObjectId;

//Function to get all orders
const getAllOrders = async (req, res) => {
  //#swagger.tags=["Orders"]
  try {
    const result = mongodb.getDatabase().collection("orders").find();
    const orders = await result.toArray();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        error.message || "An error occurred while retrieving the orders",
    });
  }
};

//Function to retrieve single orders
const getSingleOrder = async (req, res) => {
  //#swagger.tags=["Orders"]
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid orders ID" });
    }
    const ordersId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("orders")
      .findOne({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({ message: "orders not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "An error occurred while retrieving the orders",
    });
  }
};

//create orders function
const createOrder = async (req, res) => {
  //#swagger.tags=["Orders"]
  try {
    if (
      !req.body.ordersName ||
      !req.body.description ||
      !req.body.durationWeeks ||
      !req.body.level ||
      !req.body.fee
    ) {
      return res.status(400).json({ message: "All fields required" });
    }
    const createOrder = {
      ordersName: req.body.ordersName,
      description: req.body.description,
      durationWeeks: req.body.durationWeeks,
      level: req.body.level,
      fee: req.body.fee,
    };
    const result = await mongodb
      .getDatabase()
      .collection("orders")
      .insertOne(createOrder);
    if (!result.acknowledged) {
      return res.status(500).json({ message: "order could not be created!" });
    }
    res.status(201).send("order created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Some error occurred while creating order",
    });
  }
};

//Function to update orders
const updateOrder = async (req, res) => {
  //#swagger.tags=["orders"]
  try {
    const order = {
      ordersName: req.body.ordersName,
      description: req.body.description,
      durationWeeks: req.body.durationWeeks,
      level: req.body.level,
      fee: req.body.fee,
    };
    const response = await mongodb
      .getDatabase()
      .collection("orders")
      .replaceOne({ _id: req.params.id }, order);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json({ message: "order updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Server error");
  }
};

//Function to delete orders
const deleteOrder = async (req, res) => {
  //#swagger.tags=["Orders"]
  try {
    const response = await mongodb
      .getDatabase()
      .collection("orders")
      .deleteOne({ _id: req.params.id });
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).send("order deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Something went wrong during deletion",
    });
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
