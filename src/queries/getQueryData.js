const databaseConnection = require("../database/db_connection.js");

const getQueryData = (qs, cb) => {
  databaseConnection.query(qs, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const deletPostFromDB = (qs, cb) => {
  databaseConnection.query(qs, (err, res) => {
    if (err) {
      cb(err);
    }
  });
};

module.exports = { getQueryData, deletPostFromDB };
