const express = require("express");
const categoriesController = require("../controllers/categoriesController");
const router = express.Router()
const isAuthenticated = require("../middleware/authenticate.js");

router.get("/", categoriesController.getAllCategories);
router.get("/:id", categoriesController.getSingleCategory);
router.post("/", isAuthenticated, categoriesController.createCategory);
router.put("/:id", isAuthenticated, categoriesController.updateCategory);
router.delete("/:id", isAuthenticated, categoriesController.deleteCategory);



module.exports = router;