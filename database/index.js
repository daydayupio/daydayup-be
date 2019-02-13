const mysql = require('mysql')
const mysqlConf = require('../config/database')

function initializeConnection() {
  function addDisconnectHandler(connection) {
    connection.on("error", function (error) {
      if (error instanceof Error) {
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
          console.error(error.stack);
          console.log("Lost connection. Reconnecting...");

          initializeConnection(connection.config);
        } else if (error.fatal) {
          throw error;
        }
      }
    });
  }

  const connection = mysql.createConnection(mysqlConf);

  // Add handlers.
  addDisconnectHandler(connection);

  connection.connect();
  return connection;
}

const conn = initializeConnection()

module.exports = {
  conn,
  query(...args) {
    const rst = new Promise(resolve => {
      conn.query(...args, function (error, results, fields) {
        if (error) {
          resolve([error, null, null])
        }
        resolve([null, results, fields])
      })
    })
    return rst
  }
}