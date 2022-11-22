import {FastifyInstance} from 'fastify/types/instance'
import {getEventsScheme} from './schemes'
import {createEvent, getEvents} from '../../modules/event/actions'

function event(fastify: FastifyInstance, _: RegistrationOptions, done: (err?: Error) => void) {

    fastify.post('/create', {
        schema: getEventsScheme
    }, async () => {
        return await createEvent()
    })

    fastify.get('/get', {
        schema: getEventsScheme
    }, async () => {
        return await getEvents()
    })

    done()
}

export {
    event
}

