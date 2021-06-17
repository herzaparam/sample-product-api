const connection = require("../configs/dbConfig");

exports.getOneProduct = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM product WHERE id = ?`, id,
            (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error("Internal Server Error"));
                }
            })
    })
}

exports.getAllProduct = (
    queryPage,
    queryPerPage,
    keyword
) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT COUNT(*) AS totalData FROM product WHERE name LIKE ?",
            [`%${keyword}%`],
            (err, resultCount) => {
                let totalData, page, perPage, totalPage;
                if (err) {
                    reject(new Error("Internal Server Error"));
                } else {
                    totalData = resultCount[0].totalData;
                    page = queryPage ? parseInt(queryPage) : 1;
                    perPage = queryPerPage ? parseInt(queryPerPage) : 5;
                    totalPage = Math.ceil(totalData / perPage);
                }
                const firstData = perPage * page - perPage;
                connection.query(
                    `SELECT * FROM product WHERE name LIKE ? LIMIT ?, ?`,
                    [`%${keyword}%`, firstData, perPage],
                    (err, result) => {
                        if (!err) {
                            resolve([totalData, totalPage, result, page, perPage]);
                        } else {
                            reject(new Error("Internal Server Error"));
                        }
                    }
                );
            }
        );
    });
};

exports.insertProduct = (data) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO product SET ?", data, (err, result) => {
            if (!err) {
                connection.query(
                    "SELECT * FROM product WHERE id = ?",
                    result.insertId,
                    (err, result) => {
                        if (!err) {
                            resolve(result);
                        } else {
                            reject(new Error("Internal server error"));
                        }
                    }
                );
            } else {
                reject(new Error("Internal server error"));
            }
        });
    });
};

exports.updateProduct = (data) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE product SET image = ?, name = ?, buy_price = ?, sell_price = ?, stock = ?`, [data.image, data.name, data.buy_price, data.sell_price, data.stock],
            (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error("Internal server error"));
                }
            })
    })
}

exports.buyProduct = (id, total) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM product WHERE id = ?`, id,
            (err, result) => {
                if (!err) {
                    const stock = result[0].stock
                    if (stock > total) {
                        const newTotal = stock - total
                        connection.query(`UPDATE product SET stock = ?`, newTotal,
                            (err, buyResult) => {
                                if (!err) {
                                    buyResult.stockAvailable = newTotal
                                    resolve(buyResult)
                                } else {
                                    reject(new Error("Internal server error"));
                                }
                            })
                    } else {
                        reject(new Error("not enough stock"));
                    }
                } else {
                    reject(new Error("Internal server error"));
                }
            })
    })
}