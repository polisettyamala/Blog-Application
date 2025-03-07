const http = require("http");

const reqListner = require("./routes");
console.log(reqListner )

const server = http.createServer(reqListner);

server.listen(8080);
