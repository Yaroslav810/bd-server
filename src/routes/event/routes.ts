import {FastifyInstance} from 'fastify/types/instance'
import {addLike, createEvent, getEvent, getEvents, getLikedEvents, removeLike} from '../../modules/event/actions'
import {FastifyRequest} from 'fastify/types/request'
import {mapCreateEventDtoToEvent} from './mappers'
import {getUser, verifyUser} from '../common/utils'
import {CreateEventDto, createEventsScheme} from './schemes/createEvent'
import {getEventsScheme} from './schemes/getEvents'
import {getEventScheme} from './schemes/getEvent'
import {addLikeScheme} from './schemes/addLike'
import {removeLikeScheme} from './schemes/removeLike'
import {likedScheme} from './schemes/liked'

function event(fastify: FastifyInstance, _: RegistrationOptions, done: (err?: Error) => void) {

    fastify.post('/create', {
        schema: createEventsScheme
    }, async (request: FastifyRequest) => {
        const userId = verifyUser(request, fastify)
        const event = mapCreateEventDtoToEvent(request.body as CreateEventDto)
        return await createEvent(event, userId)
    })

    fastify.post('/add-like/:id', {
        schema: addLikeScheme
    }, async (request: FastifyRequest) => {
        const userId = verifyUser(request, fastify)
        const {id: eventId} = request.params as { id: string }
        return await addLike(eventId, userId)
    })

    fastify.post('/remove-like/:id', {
        schema: removeLikeScheme
    }, async (request: FastifyRequest) => {
        const userId = verifyUser(request, fastify)
        const {id: eventId} = request.params as { id: string }
        return await removeLike(eventId, userId)
    })

    fastify.get('/liked', {
        schema: likedScheme
    }, async (request: FastifyRequest) => {
        const userId = verifyUser(request, fastify)
        return await getLikedEvents(userId)
    })

    fastify.get('/get', {
        schema: getEventsScheme
    }, async (request: FastifyRequest) => {
        const user = getUser(request, fastify)
        return await getEvents(user)
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

