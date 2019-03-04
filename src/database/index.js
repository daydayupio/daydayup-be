const mysql = require("mysql")
const mysqlConf = require("../config/database")
const logger = require("../util/logger")

function initializeConnection() {
    function addDisconnectHandler(connection) {
        connection.on("error", function(error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    logger("error")(error.stack)
                    logger("error")("Lost connection. Reconnecting...")

                    initializeConnection(connection.config)
                } else if (error.fatal) {
                    throw error
                }
            }
        })
    }

    const connection = mysql.createConnection(mysqlConf)

    // Add handlers.
    addDisconnectHandler(connection)

    connection.connect()
    return connection
}

const conn = initializeConnection()

module.exports = {
    conn,

    /**
     * @typedef {Object} Result
     * @property {number} id
     * @property {Date} created_at
     * @property {Date} updated_at
     */
    /**
     * @typedef {Object} QueryResponse
     * @property {Array.<Result>} results
     * @property {Array.<any>} fields
     */
    /**
     *
     * @param  {...any} args
     * @returns {Promise<QueryResponse>}
     */
    query(...args) {
        logger("query").debug(...args)
        const rst = new Promise((resolve, reject) => {
            conn.query(...args, function(error, results, fields) {
                if (error) {
                    reject(error)
                }
                resolve({ results, fields })
            })
        })
        return rst
    },
}
