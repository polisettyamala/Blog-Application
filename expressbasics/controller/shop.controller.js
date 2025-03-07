const Product = require("../models/products.model");

exports.getProducts = (req, res, next) => {
  Product.getAllProducts((products) => {
    res.render("shop", { prods: products });
  });
};
