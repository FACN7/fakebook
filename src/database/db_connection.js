const {
  Pool
} = require("pg");

const url = require("url");
require("env2")("./config.env");

let DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) throw new Error("Enviroment variable DATABASE_URL must be set");
if (process.env.NODE_ENV === "test") {
  DATABASE_URL = process.env.TEST_DATABASE_URL;
}

const params = url.parse(DATABASE_URL);
const [username, password] = params.auth.split(":");

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split("/")[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user: username,
  password: password
};

options.ssl = options.host !== "localhost";

module.exports = new Pool(options);