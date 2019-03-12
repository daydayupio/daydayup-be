import * as log4js from "log4js";

const loggerLevel = {
    default: "info",
    query: "debug",
};

export function logger(scope = "default") {
    const logger = log4js.getLogger(scope);
    logger.level = loggerLevel[scope];
    return logger;
}
