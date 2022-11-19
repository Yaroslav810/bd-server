import {settings} from './core/Settings'
import {application} from './application'
import {initApplication} from './core/application/init'

const app = application()
const start = async () => {
    try {
        await app.listen({port: settings.APP_PORT})
        initApplication(app)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}
start()
