const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const multer = require("../middlewares/multer");

router
    .get("/", productController.findAll)
    .post("/insert", multer.uploadImage.single("image"), productController.insert)
    .put("/update/:id", multer.uploadImage.single("image"), productController.update)
    .put("/buy/:id", productController.buy);

module.exports = router;