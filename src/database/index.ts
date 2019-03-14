import * as mysql from "mysql";
import * as mysqlConf from "../config/database";
import { logger } from "../util/logger";

function initializeConnection() {
    function addDisconnectHandler(connection) {
        connection.on("error", function(error) {
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

export const conn = initializeConnection();
export function query(sql: string): Promise<{ results: any; fields: any }> {
    logger("query").debug(sql);
    return new Promise((resolve, reject) => {
        conn.query(sql, function(error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve({ results, fields });
        });
    });
}
