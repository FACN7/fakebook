const databaseConnection = require("../database/db_connection.js");

const getQueryData = (qs,cb) => {
  databaseConnection.query(qs, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = getQueryData;
