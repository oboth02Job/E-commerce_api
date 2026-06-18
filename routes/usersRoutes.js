const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router()
const isAuthenticated = require("../middleware/authenticate.js");

// DELETE /users/:id handled by controller

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getSingleUser);
router.post("/", isAuthenticated, usersController.createUser);
router.put("/:id", isAuthenticated, usersController.updateUser);
router.delete("/:id", isAuthenticated, usersController.deleteUser);



module.exports = router; 