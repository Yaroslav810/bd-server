import {getDbProvider} from '../../infrastructure/provider'
import {mapEventEntityToGetEventsEventDto, mapEventEntityToGetEventDto} from '../../routes/event/mappers'
import {verifyExisting} from '../../../core/http/httpUtils'
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

export {
    createEvent,
    getEvents,
    getEvent
}
