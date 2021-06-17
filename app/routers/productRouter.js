const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const multer = require("../middlewares/multer");

router
    .get("/", productController.findAll)
    .get('/one/:id', productController.getOne)
    .post("/insert", multer.uploadImage.single("image"), productController.insert)
    .put("/update/:id", multer.uploadImage.single("image"), productController.update)
    .put("/buy/:id", productController.buy)
    .delete("/delete/:id", productController.deleteProduct);

module.exports = router;