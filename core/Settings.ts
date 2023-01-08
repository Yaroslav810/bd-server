import * as dotenv from 'dotenv'
import {Logger} from './Logger'

class Settings {
    readonly APP_PORT: number
    readonly DATABASE_URL: string
    readonly SESSION_SECRET: string
    readonly SALT_WORK_FACTOR: number

    constructor() {
        dotenv.config()
        if (!process.env['APP_PORT'] || !process.env['DATABASE_URL']) {
            Logger.error('You need to fill in the .env file')
            throw new Error('No data in .env')
        }

        this.APP_PORT = parseInt(process.env['APP_PORT'] as string)
        this.DATABASE_URL = process.env['DB_HOST'] as string
        this.SESSION_SECRET = process.env['SESSION_SECRET'] as string
        this.SALT_WORK_FACTOR = parseInt(process.env['SALT_WORK_FACTOR'] as string)
    }
}

const settings = new Settings()
export {
    settings
}
