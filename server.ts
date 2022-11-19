import {settings} from './core/Settings'
import {application} from './application'

const app = application()
const start = async () => {
    try {
        await app.listen({port: settings.APP_PORT})
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}
start()
