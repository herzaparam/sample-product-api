const productModel = require("../models/productModel");
const helper = require("../helpers/printHelper");

exports.findAll = (req, res) => {
    const { page, perPage } = req.query;
    const keyword = req.query.keyword ? req.query.keyword : "";
    const size = req.query.size ? req.query.size : "";
    const color = req.query.color ? req.query.color : "";
    const category = req.query.category ? req.query.category : "";
    const brand = req.query.brand ? req.query.brand : "";
    const sortBy = req.query.sortBy ? req.query.sortBy : "product.id";
    const order = req.query.order ? req.query.order : "DESC";
  
    productModel
      .getAllProduct(
        page,
        perPage,
        keyword,
        sortBy,
        order,
        size,
        color,
        category,
        brand
      )
      .then(([totalData, totalPage, result, page, perPage]) => {
        if (result < 1) {
          helper.printError(res, 400, "Product not found");
          return;
        }
        helper.printPaginate(
          res,
          200,
          "Find all product successfully",
          totalData,
          totalPage,
          result,
          page,
          perPage
        );
      })
      .catch((err) => {
        helper.printError(res, 500, err.message);
      });
  };