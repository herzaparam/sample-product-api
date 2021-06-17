const productModel = require("../models/productModel");
const helper = require("../helpers/printHelper");
const path = require("path");

exports.findAll = (req, res) => {
    const { page, perPage } = req.query;
    const keyword = req.query.keyword ? req.query.keyword : "";

    productModel
        .getAllProduct(
            page,
            perPage,
            keyword
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

exports.insert = (req, res) => {
    const image = req.file;

    const {
        name,
        buyPrice,
        sellPrice,
        stock,
    } = req.body;

    const data = {
        image: image.path,
        name,
        buy_price: buyPrice,
        sell_price: sellPrice,
        stock
    }

    productModel
        .insertProduct(data)
        .then((result) => {
            helper.printSuccess(res, 200, "New product has been created", result);
        })
        .catch((err) => {
            helper.printError(res, 500, err.message);
        });
}


exports.update = async (req, res) => {
    const id = req.params.id

    const resProduct = await productModel.getOneProduct(id)
    if (resProduct.length !== 0) {
        let image;
        if (!req.file) {
            image = resProduct[0].image;
        } else {
            image = req.file.path;
        }

        const name = req.body.name ? req.body.name : res.product[0].name
        const buyPrice = req.body.buyPrice ? req.body.buyPrice : res.product[0].buy_price
        const sellPrice = req.body.sellPrice ? req.body.sellPrice : res.product[0].sell_price
        const stock = req.body.stock ? req.body.stock : res.product[0].stock

        const data = {
            id: id,
            image,
            name,
            buy_price: buyPrice,
            sellPrice: sellPrice,
            stock
        }

        productModel
            .updateProduct(data)
            .then((result) => {
                helper.printSuccess(res, 200, "succesfully update this product", result);
            })
            .catch((err) => {
                helper.printError(res, 500, err.message);
            });

    } else {
        helper.printError(res, 500, `can not find item with this ${id}`);
    }



}

exports.buy = (req, res) => {
    const id = req.params.id
    const total = req.query.total

    productModel
        .buyProduct(id, total)
        .then((result) => {
            helper.printSuccess(res, 200, "succesfully buy this product", result);
        })
        .catch((err) => {
            helper.printError(res, 500, err.message);
        });
}