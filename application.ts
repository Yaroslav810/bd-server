import Fastify from 'fastify'
import Bcrypt from 'fastify-bcrypt'
import {user} from "./src/routes/user/routes"
import {event} from "./src/routes/event/routes";

function application() {
    const fastify = Fastify({
        logger: true
    })

    fastify.register(Bcrypt, {
        saltWorkFactor: 12
    })

    fastify.get('/', async () => {
        return {
            hello: 'world'
        }
    })

    fastify.register(user, {
        prefix: "/user",
    } as RegistrationOptions);

    fastify.register(event, {
        prefix: "/event",
    } as RegistrationOptions);

    return fastify
}

export {
    application
}
