import Fastify from 'fastify'
import {settings} from "./core/Settings"

const fastify = Fastify({
    logger: true
})

fastify.get('/', async () => {
    return {
        hello: 'world'
    }
})

const start = async () => {
    try {
        await fastify.listen({port: settings.APP_PORT})
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
