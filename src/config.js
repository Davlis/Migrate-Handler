import { load as dotenvLoad } from 'dotenv'

export default function generateConfig() {
    const env = dotenvLoad({ path: '.env' }).parsed || process.env

    return {
        mongo: {
            uri: env.DATABASE_URL,
        },
    }
}