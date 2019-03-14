"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const mysqlConf = require("../config/database");
const logger_1 = require("../util/logger");
function initializeConnection() {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            // if (error instanceof Error) {
            //     if (error.code === "PROTOCOL_CONNECTION_LOST") {
            //         // logger("error")(error.stack);
            //         // logger("error")("Lost connection. Reconnecting...");
            //         initializeConnection();
            //     } else if (error.fatal) {
            //         throw error;
            //     }
            // }
        });
    }
    const connection = mysql.createConnection(mysqlConf);
    // Add handlers.
    addDisconnectHandler(connection);
    connection.connect();
    return connection;
}
exports.conn = initializeConnection();
function query(sql) {
    logger_1.logger("query").debug(sql);
    return new Promise((resolve, reject) => {
        exports.conn.query(sql, function (error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve({ results, fields });
        });
    });
}
exports.query = query;
//# sourceMappingURL=index.js.map