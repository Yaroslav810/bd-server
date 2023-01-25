import {FastifyInstance} from 'fastify/types/instance'
import {
    addLike,
    createEvent,
    getEvent,
    getEvents,
    getLikedEvents,
    getUserEvents, removeEvent,
    removeLike
} from '../../modules/event/actions'
import {FastifyRequest} from 'fastify/types/request'
import {mapCreateEventDtoToEvent} from './mappers'
import {getUser, verifyUser} from '../common/utils'
import {CreateEventDto, createEventsScheme} from './schemes/createEvent'
import {getEventsScheme} from './schemes/getEvents'
import {getEventScheme} from './schemes/getEvent'
import {addLikeScheme} from './schemes/addLike'
import {removeLikeScheme} from './schemes/removeLike'
import {getLikedEventScheme} from './schemes/getLikedEvents'
import {getMyEventsScheme} from './schemes/getMyEvents'
import {deleteEventScheme} from './schemes/deleteEvent'

function event(fastify: FastifyInstance, _: RegistrationOptions, done: (err?: Error) => void) {

    fastify.get('/get', {
        schema: getEventsScheme
    }, async (request: FastifyRequest) => {
        const user = getUser(request, fastify)
        return await getEvents(user)
    })

    fastify.get('/get/:id', {
        schema: getEventScheme
    }, async (request: FastifyRequest) => {
        const user = getUser(request, fastify)
        const {id} = request.params as { id: string }
        return await getEvent(id, user)
    })

    fastify.post('/create', {
        schema: createEventsScheme
    }, async (request: FastifyRequest) => {
        const userId = verifyUser(request, fastify)
        const data = JSON.parse((request.body as {data: string}).data) as CreateEventDto
        const image = (request.body as {image: File | null}).image
        const event = mapCreateEventDtoToEvent(data as CreateEventDto, image)
        return await createEvent(event, userId)
    })

    fastify.post('/delete/:id', {
        schema: deleteEventScheme
    }, async (request: FastifyRequest) => {
        const userId = verifyUser(request, fastify)
        const {id: eventId} = request.params as { id: string }
        return await removeEvent(eventId, userId)
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
        schema: getLikedEventScheme
    }, async (request: FastifyRequest) => {
        const userId = verifyUser(request, fastify)
        return await getLikedEvents(userId)
    })

    fastify.get('/my', {
        schema: getMyEventsScheme
    }, async (request: FastifyRequest) => {
        const userId = verifyUser(request, fastify)
        return await getUserEvents(userId)
    })

    done()
}

export {
    event
}

