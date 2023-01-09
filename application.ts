import Fastify from 'fastify'
import Bcrypt from 'fastify-bcrypt'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import {user} from './src/routes/user/routes'
import {event} from './src/routes/event/routes'
import {settings} from './core/Settings'

function application() {
    const fastify = Fastify({
        logger: true
    })

    fastify.register(cors, {})

    fastify.register(Bcrypt, {
        saltWorkFactor: settings.SALT_WORK_FACTOR
    })

    fastify.register(jwt, {
        secret: settings.SESSION_SECRET
    })

    fastify.get('/', async () => {
        return {
            hello: 'world'
        }
    })

    fastify.register(user, {
        prefix: '/user'
    } as RegistrationOptions)

    fastify.register(event, {
        prefix: '/event'
    } as RegistrationOptions)

    return fastify
}

export {
    application
}
