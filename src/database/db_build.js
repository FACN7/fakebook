const fs = require("fs");
const path = require("path");

const dbConnection = require("./db_connection.js");

const sqlPath = path.join(__dirname, "db_build.sql");
const sql = fs.readFileSync(sqlPath).toString();

dbConnection.query(sql, (err, res) => {
  if (err) throw err;
  if (process.env.NODE_ENV === "test") console.log("Tables created with result: ", res);
});

const runDbBuild = cb => dbConnection.query(sql, cb);

module.exports = runDbBuild;