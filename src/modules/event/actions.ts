import {getDbProvider} from '../../infrastructure/provider'
import {
    mapEventWithUserAndLikeEntityToGetEventsEventDto,
    mapEventEntityToGetEventDto,
    mapEventsWithUserEntityToLikedEventDto
} from '../../routes/event/mappers'
import {sendForbidden, verifyExisting} from '../../../core/http/httpUtils'
import {Event} from '../../model/event'
import {GetEventsEventDto} from '../../routes/event/schemes/getEvents'
import {GetEventDto} from '../../routes/event/schemes/getEvent'

const provider = getDbProvider()

async function createEvent(event: Event, userId: string): Promise<boolean> {
    await provider.event.create(event, userId)
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

async function getLikedEvents(userId: string): Promise<Array<GetEventsEventDto>> {
    const likes = await provider.event.getLikesByUserId(userId)
    if (likes.length === 0) {
        return []
    }

    const eventIds = likes.map(like => like.event_id)
    const events = await provider.event.getEventsById(eventIds)
    return events.map(mapEventsWithUserEntityToLikedEventDto)
}

export {
    createEvent,
    getEvents,
    getEvent,
    addLike,
    removeLike,
    getLikedEvents
}
