const http = require("http");
const router = require("./router.js");

const server = http.createServer(router);
const port = process.env.PORT || 8282;

server.listen(port, () => {
  console.log(`Server ON FIRE  VIA PORT  ${port}`);
});
