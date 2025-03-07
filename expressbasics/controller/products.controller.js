const Product = require("../models/products.model");
exports.addProducts = (req, res, next) => {
  res.render("addProduct");
};

exports.postProducts = (req, res, next) => {
  const prodTitle = req.body.title;
  const product = new Product({
    title: prodTitle,
    image: "image url",
    price: 500,
  });
  product
    .save()
    .then(() => {
      console.log("Product saved");
    })
    .catch((err) => {
      console.log(err);
    });
};
