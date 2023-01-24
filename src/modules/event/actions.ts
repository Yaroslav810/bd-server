import {getDbProvider} from '../../infrastructure/provider'
import {
    mapEventWithUserAndLikeEntityToGetEventsEventDto,
    mapEventEntityToGetEventDto,
    mapEventsWithUserEntityToGetLikedEventsDto, mapEventWithUserAndLikeEntityToGetMyEventsDto
} from '../../routes/event/mappers'
import {sendForbidden, verifyExisting} from '../../../core/http/httpUtils'
import {Event} from '../../model/event'
import {GetEventsEventDto} from '../../routes/event/schemes/getEvents'
import {GetEventDto} from '../../routes/event/schemes/getEvent'
import {GetLikedEventsDto} from '../../routes/event/schemes/getLikedEvents'
import {GetMyEventsDto} from '../../routes/event/schemes/getMyEvents'
import {createImage, isValidImage} from '../static/actions'

const provider = getDbProvider()

async function createEvent(event: Event, userId: string): Promise<boolean> {
    let title = null
    if (event.image) {
        const isValid = isValidImage(event.image)
        if (!isValid) {
            sendForbidden('Невалидное изображение')
        }

        title = await createImage(event.image)
        console.log(userId)
    }
    await provider.event.create(event, userId, title)
    return true
}

async function removeEvent(eventId: string, userId: string): Promise<boolean> {
    const event = verifyExisting(await provider.event.getEvent(eventId))
    if (event.user_id !== userId) {
        sendForbidden()
    }
    await provider.event.delete(eventId)
    return true
}

async function getEvents(userId: string | null): Promise<Array<GetEventsEventDto>> {
    const events = await provider.event.getEvents({
        withUser: true,
        withLike: true
    })

    return events.map(event => mapEventWithUserAndLikeEntityToGetEventsEventDto(
        event,
        userId
    ))
}

async function getEvent(eventId: string): Promise<GetEventDto> {
    const event = verifyExisting(await provider.event.getEvent(eventId))
    const user = verifyExisting(await provider.user.getUserById(event.user_id))
    return mapEventEntityToGetEventDto(event, user.login, false)
}

async function addLike(eventId: string, userId: string): Promise<void> {
    verifyExisting(await getEvent(eventId))
    await provider.event.getLike(eventId, userId) && sendForbidden()
    await provider.event.addLike(eventId, userId)
}

async function removeLike(eventId: string, userId: string): Promise<boolean> {
    verifyExisting(await getEvent(eventId))
    const like = await provider.event.getLike(eventId, userId)
    if (!like) {
        sendForbidden()
    }
    await provider.event.removeLike(like.like_id)
    return true
}

async function getLikedEvents(userId: string): Promise<Array<GetLikedEventsDto>> {
    const likes = await provider.event.getLikesByUserId(userId)
    if (likes.length === 0) {
        return []
    }

    const eventIds = likes.map(like => like.event_id)
    const events = await provider.event.getEventsById(eventIds)
    return events.map(mapEventsWithUserEntityToGetLikedEventsDto)
}

async function getUserEvents(userId: string): Promise<Array<GetMyEventsDto>> {
    const events = await provider.event.getEventsByUserId(userId)
    return events.map(event => mapEventWithUserAndLikeEntityToGetMyEventsDto(event, userId))
}

export {
    createEvent,
    removeEvent,
    getEvents,
    getEvent,
    addLike,
    removeLike,
    getLikedEvents,
    getUserEvents
}
