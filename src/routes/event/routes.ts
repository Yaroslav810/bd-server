import {FastifyInstance} from 'fastify/types/instance'
import {CreateEventDto, createEventsScheme, getEventScheme, getEventsScheme} from './schemes'
import {createEvent, getEvent, getEvents} from '../../modules/event/actions'
import {FastifyRequest} from 'fastify/types/request'
import {mapCreateEventDtoToEvent} from './mappers'
import {verifyUser} from '../common/utils'

function event(fastify: FastifyInstance, _: RegistrationOptions, done: (err?: Error) => void) {

    fastify.post('/create', {
        schema: createEventsScheme
    }, async (request: FastifyRequest) => {
        const userId = verifyUser(request, fastify)
        const event = mapCreateEventDtoToEvent(request.body as CreateEventDto)
        return await createEvent(event, userId)
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

