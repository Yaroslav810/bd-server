import {FastifyInstance} from "fastify/types/instance"
import {getScheme} from "./schemes"
import {createEvent, getEvents} from "../../modules/event/actions"

function event(fastify: FastifyInstance, _: RegistrationOptions, done: Function) {

    fastify.post('/create', {
        schema: getScheme,
    }, async () => {
        return await createEvent()
    })

    fastify.get('/get', {
        schema: getScheme,
    }, async () => {
        return await getEvents()
    })

    done()
}

export {
    event,
}

