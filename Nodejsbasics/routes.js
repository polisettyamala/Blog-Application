const fs = require("fs");
const reqListner = (req, res) =>{
  if (req.url === "/") {
    res.write("<html>");
    res.write(
      '<body><form action="/products" method="POST"><input type="text" name="title" /> <button type="submit">Submit</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (req.url === "/products" && req.method === "POST") {
    const products = [];
    req.on("data", (chunk) => {
      products.push(chunk);
    });

    return req.on("end", () => {
      const productdata = Buffer.concat(products).toString();
      const productTitle = productdata.split("=")[0];
      // fs.writeFileSync("products.txt", productTitle);
      fs.writeFile("products.txt", productTitle, (err) => {
        res.statusCode = 301;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Contnt-type", "text/html");
  res.write("<html>");
  res.write("<head><title>Node Response</title></head>");
  res.write("<body><h1>Hello from NodeJS response</h1></body>");
  res.write("</html>");
  res.end();
}

// Method:1 => Exporting sngle function 
module.exports = reqListner

// Method-2 => exposrting as an Object 
// module.exports = {
//     reqFunction : reqListner,
//     randomTxt : "Hello from radom text"
// }

// Method-3 => Exporting individually as a var 
// module.exports.reqFunction = reqListner;
// module.exports.randomTxt = "Hello from NodeJS random string"