const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin.routes");
const shopRoutes = require("./routes/shop.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({ extended: true }));
// {extended : false} -> Parse the data using querystring module.( supports simple object)
// {extended : true} -> Parse the data using qs library. ( supports nested object)
app.use(express.static(path.join(__dirname, "public")));

app.use(adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  //   res.send("<h1>Page not found</h1>");
  res.status(404).render("error", { title: "404", status: 404 });
});

mongoose
  .connect(
    `mongodb+srv://adarshaadi1996:ecom27-01-25@cluster0.6oeou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(console.log(`DB connection established`), app.listen(3000))
  .catch((err) => console.log(err));

/*

*/
