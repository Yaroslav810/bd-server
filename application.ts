import Fastify from 'fastify'
import {DbProvider} from './src/infrastructure/provider'
import {UserType} from './src/model/user'

function application() {
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
                    first_name: {type: 'string'}
                }
            }
        }
    }, async (request) => {
        await provider.user.createUser(request.body as UserType)
        return null
    })

    return fastify
}

export {
    application
}
