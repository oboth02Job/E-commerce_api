const ObjectId = require("mongodb").ObjectId;
const mongodb = require("../data/database");

//Function to get all users
const getAllUsers = async (req, res) => {
  //#swagger.tags=["Users"]
  try {
    const users = mongodb.getDatabase().collection("users").find();
    const response = await users.toArray();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

//Function to get single user
const getSingleUser = async (req, res) => {
  //#swagger.tags=["Users"]
    try {
        const userId = req.params.id;
        
    const user = await mongodb
      .getDatabase()
      .collection("users")
      .findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

//Function to create user
const createUser = async (req, res) => {
  //#swagger.tags=["Users"]
  try {
    if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.phoneNumber ||
    !req.body.password ||
    !req.body.role ||
    !req.body.registrationDate
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      role: req.body.role,
      registrationDate: req.body.registrationDate
    };
    const response = await mongodb
      .getDatabase()
      .collection("users")
      .insertOne(user);

    if (response.acknowledged) {
      return res.status(201).send("User created successfully");
    }
  } catch (error) {
      console.error(error)
    res.status(500).json(error.message || "Some error occurred while updating user");
  }
};

//Function to update user
const updateUser = async (req, res) => {
  //#swagger.tags=["Users"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      role: req.body.role,
      registrationDate: req.body.registrationDate,
    };
    const response = await mongodb
      .getDatabase()
      .collection("users")
      .replaceOne({ _id: userId }, user);

    if (response.modifiedCount === 0) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

//Function to delete user
const deleteUser = async (req, res) => {
  //#swagger.tags=["Users"]
    try {
      const userId = req.params.id
    
    const response = await mongodb
      .getDatabase()
      .collection("users")
      .deleteOne({ _id: userId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
   return res.status(500).json(error.message || "Some error occurred while deleting user");
  }
};

module.exports = { getAllUsers, getSingleUser, createUser, updateUser, deleteUser };
