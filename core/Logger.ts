import {writeFileSync} from 'fs'

class Logger {
    public static readonly LOG_DIR = './log'
    public static readonly INFO_FILE = `${Logger.LOG_DIR}/info.log`
    public static readonly ERRORS_FILE = `${Logger.LOG_DIR}/errors.log`

    static log(...str: Array<string>): void {
        writeFileSync(Logger.INFO_FILE, `${str.join(' ')}\n`, {
            flag: 'a'
        })
    }

    static error(err: Error | string): void {
        const message = err instanceof Error ? err.stack : err
        writeFileSync(Logger.ERRORS_FILE, `[${new Date()}]\n${message}\n`, {
            flag: 'a'
        })
    }
}

export {
    Logger
}
