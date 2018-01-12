require('dotenv').config()

function generateConfig() {
    return {
        mongo: {
            uri: process.env.DATABASE_URL,
        },
    }
}

module.exports = generateConfig;
