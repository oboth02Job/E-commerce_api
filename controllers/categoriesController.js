const mongodb = require("../data/database.js");
const ObjectId = require("mongodb").ObjectId;

//Function to get all categories
const getAllCategories = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    const result = mongodb.getDatabase().collection("categories").find();
    const categories = await result.toArray();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        error.message || "An error occurred while retrieving the categories",
    });
  }
};

//Function to retrieve single category
const getSingleCategory = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid category ID" });
    }
    const categoryId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("categories")
      .findOne({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({ message: "category not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "An error occurred while retrieving the category",
    });
  }
};

//create category function
const createCategory = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    if (
      !req.body.name ||
      !req.body.description 
      
    ) {
      return res.status(400).json({ message: "All fields required" });
    }
    const createCategory = {
      name: req.body.name,
      description: req.body.description,
      
    };
    const result = await mongodb
      .getDatabase()
      .collection("categories")
      .insertOne(createCategory);
    if (!result.acknowledged) {
      return res.status(500).json({ message: "category could not be created!" });
    }
    res.status(201).send("category created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Some error occurred while creating category",
    });
  }
};

//Function to update category
const updateCategory = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    const category = {
      name: req.body.name,
      description: req.body.description,
    };
    const response = await mongodb
      .getDatabase()
      .collection("categories")
      .replaceOne({ _id: req.params.id }, category);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "category not found" });
    }
    res.status(200).json({ message: "category updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Server error");
  }
};

//Function to delete category
const deleteCategory = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    const response = await mongodb
      .getDatabase()
      .collection("categories")
      .deleteOne({ _id: req.params.id });
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "category not found" });
    }
    res.status(200).send("category deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Something went wrong during deletion",
    });
  }
};

module.exports = {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
