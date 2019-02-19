const log4js = require('log4js')

const loggerLevel = {
  'query': 'debug'
}

function logger(scope = 'default') {
  const logger = log4js.getLogger(scope)
  logger.level = loggerLevel[scope] || 'info'
  return logger
}
module.exports = logger