const express = require("express");
const route = express.Router();


const productRouter = require("./productRouter");

route.use("/product", productRouter);

module.exports = route;
