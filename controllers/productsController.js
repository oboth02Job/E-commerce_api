const mongodb = require("../data/database.js");
const ObjectId = require("mongodb").ObjectId;

//Function to get all products
const getAllProducts = async (req, res) => {
  //#swagger.tags=["Products"]
  try {
    const result = mongodb.getDatabase().collection("products").find();
    const products = await result.toArray();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        error.message || "An error occurred while retrieving the products",
    });
  }
};

//Function to retrieve single product
const getSingleProduct = async (req, res) => {
  //#swagger.tags=["Products"]
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid product ID" });
    }
    const productId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("products")
      .findOne({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "An error occurred while retrieving the product",
    });
  }
};

//create product function
const createProduct = async (req, res) => {
  //#swagger.tags=["Products"]
  try {
    if (
    !req.body.name ||
    !req.body.description ||
    !req.body.categoryId ||
    !req.body.price ||
    !req.body.stockQuantity ||
    !req.body.brand ||
    !req.body.createDate 
    ) {
      return res.status(400).json({ message: "All fields required" });
    }
    const createProduct = {
      name: req.body.name,
      description: req.body.description,
      categoryId: req.body.categoryId,
      price: req.body.price,
        stockQuantity: req.body.stockQuantity,
        brand: req.body.brand,
      createDate: req.body.createDate
    };
    const result = await mongodb
      .getDatabase()
      .collection("products")
      .insertOne(createProduct);
    if (!result.acknowledged) {
      return res.status(500).json({ message: "product could not be created!" });
    }
    res.status(201).send("product created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Some error occurred while creating product",
    });
  }
};

//Function to update product
const updateProduct = async (req, res) => {
  //#swagger.tags=["Products"]
  try {
    const product = {
      name: req.body.name,
      description: req.body.description,
      categoryId: req.body.categoryId,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
      brand: req.body.brand,
      createDate: req.body.createDate,
    };
    const response = await mongodb
      .getDatabase()
      .collection("products")
      .replaceOne({ _id: req.params.id }, product);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: "product updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Server error");
  }
};

//Function to delete product
const deleteProduct = async (req, res) => {
  //#swagger.tags=["Products"]
  try {
    const response = await mongodb
      .getDatabase()
      .collection("products")
      .deleteOne({ _id: req.params.id });
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).send("product deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Something went wrong during deletion",
    });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
