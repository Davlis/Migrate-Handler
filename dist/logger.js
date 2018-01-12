'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = new _winston2.default.Logger({
    level: process.env.LOGGING_LEVEL || 'debug',
    handleExceptions: true,
    humanReadableUnhandledException: true,
    exitOnError: false,
    transports: [new _winston2.default.transports.Console()]
});

exports.default = logger;