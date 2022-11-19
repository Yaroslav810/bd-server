import Fastify from 'fastify'
import {settings} from "./core/Settings"
import {DbProvider} from "./src/infrastructure/provider";
import {UserType} from "./src/model/user";

const fastify = Fastify({
    logger: true
})

const provider = new DbProvider()

fastify.get('/', async () => {
    return {
        hello: 'world'
    }
})

fastify.post('/create_user', {
    schema: {
        body: {
            type: 'object',
            required: ['login', 'first_name'],
            properties: {
                login: {type: 'string'},
                first_name: {type: 'string'},
            }
        }
    }
}, async (request) => {
    await provider.user.createUser(request.body as UserType)
    return null
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
