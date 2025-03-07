const express = require("express");
const path = require("path");
const route = express.Router();
const { getProducts } = require("../controller/shop.controller");

// route.get("/", getProducts);

module.exports = route;
