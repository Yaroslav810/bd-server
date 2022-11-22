import {FastifyInstance} from 'fastify/types/instance'
import {getEventScheme, getEventsScheme} from './schemes'
import {createEvent, getEvent, getEvents} from '../../modules/event/actions'
import {FastifyRequest} from 'fastify/types/request'

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

    fastify.get('/get/:id', {
        schema: getEventScheme
    }, async (request: FastifyRequest) => {
        const {id} = request.params as { id: string }
        return await getEvent(id)
    })

    done()
}

export {
    event
}

