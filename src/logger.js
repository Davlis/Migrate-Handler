const winston = require('winston');

const logger = new winston.Logger({
    level                   : process.env.LOGGING_LEVEL || 'debug',
    handleExceptions        : true,
    humanReadableUnhandledException: true,
    exitOnError             : false,
    transports              : [
        new (winston.transports.Console)()
    ],
});

module.exports = logger;
