'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = generateConfig;

var _dotenv = require('dotenv');

function generateConfig() {
    const env = (0, _dotenv.load)({ path: '.env' }).parsed || process.env;

    return {
        mongo: {
            uri: env.DATABASE_URL
        }
    };
}