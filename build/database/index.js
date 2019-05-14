"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function queryResult(sql) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield query(sql)).results;
    });
}
exports.queryResult = queryResult;
function insertResult(sql) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield query(sql)).results;
    });
}
exports.insertResult = insertResult;
function updateResult(sql) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield query(sql)).results;
    });
}
exports.updateResult = updateResult;
function deleteResult(sql) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield query(sql)).results;
    });
}
exports.deleteResult = deleteResult;
//# sourceMappingURL=index.js.map