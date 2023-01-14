import {getDbProvider} from '../../infrastructure/provider'
import {mapEventEntityToGetEventsEventDto, mapEventEntityToGetEventDto} from '../../routes/event/mappers'
import {sendForbidden, verifyExisting} from '../../../core/http/httpUtils'
import {Event} from '../../model/event'
import {GetEventsEventDto} from '../../routes/event/schemes/getEvents'
import {GetEventDto} from '../../routes/event/schemes/getEvent'

const provider = getDbProvider()

async function createEvent(event: Event, userId: string): Promise<boolean> {
    await provider.event.create(event, userId)
    return true
}

async function getEvents(): Promise<Array<GetEventsEventDto>> {
    const events = await provider.event.getEvents()

    const eventsDto: Array<GetEventsEventDto> = []
    for (const event of events) {
        const user = await provider.user.getUserById(event.user_id)
        if (user) {
            eventsDto.push(mapEventEntityToGetEventsEventDto(
                event,
                user.login,
                0,
                false
            ))
        }
    }
    return eventsDto
}

async function getEvent(id: string): Promise<GetEventDto> {
    const event = verifyExisting(await provider.event.getEvent(id))
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

export {
    createEvent,
    getEvents,
    getEvent,
    addLike,
    removeLike
}
