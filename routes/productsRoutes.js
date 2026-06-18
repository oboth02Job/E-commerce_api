const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router()

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getSingleProduct);
router.post("/", productsController.createProduct);
router.put("/:id", productsController.updateProduct);
router.delete("/:id", productsController.deleteProduct);



module.exports = router;