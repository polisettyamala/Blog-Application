const express = require("express");
const { addProducts, postProducts } = require("../controller/products.controller");
const route = express.Router();

route.get("/add-product",addProducts );
// Body parser is used when handling form submission when the content type is routelocation/x-www-form-urlencoded
route.post("/products", postProducts);

exports.routes = route;
