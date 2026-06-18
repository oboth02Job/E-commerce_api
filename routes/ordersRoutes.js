const express = require("express");
const ordersController = require("../controllers/ordersController");
const router = express.Router();
const isAuthenticated = require("../middleware/authenticate.js");

router.get("/", ordersController.getAllOrders);
router.get("/:id", ordersController.getSingleOrder);
router.post("/", isAuthenticated, ordersController.createOrder);
router.put("/:id", isAuthenticated, ordersController.updateOrder);
router.delete("/:id", isAuthenticated, ordersController.deleteOrder);



module.exports = router;
