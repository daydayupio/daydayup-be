import * as mysql from "mysql";
import * as mysqlConf from "../config/database";
import { logger } from "../util/logger";

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

export const conn = initializeConnection();
export interface QueryResult<T> {
    results: T
    fields: mysql.FieldInfo
}
export function query<T>(sql: string): Promise<QueryResult<T>> {
    logger("query").debug(sql);
    return new Promise((resolve, reject) => {
        conn.query(sql, function (error, results: T, fields: mysql.FieldInfo) {
            if (error) {
                reject(error);
            }
            resolve({ results, fields });
        });
    });
}

export async function queryResult<T>(sql: string) {
    return (await query<T[]>(sql)).results
}

export async function insertResult(sql: string) {
    return (await query<{ insertId: number, affectedRows: number }>(sql)).results
}

export async function updateResult(sql: string) {
    return (await query<{ affectedRows: number, changedRows: number }>(sql)).results
}

export async function deleteResult(sql: string) {
    return (await query<{ affectedRows: number }>(sql)).results
}