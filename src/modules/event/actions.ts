import {getDbProvider} from '../../infrastructure/provider'
import {GetEventsEventDto} from '../../routes/event/schemes'
import {mapEventEntityToEventDto} from '../../routes/event/mappers'

const provider = getDbProvider()

async function createEvent(): Promise<boolean> {
    await provider.event.create()
    return true
}

async function getEvents(): Promise<Array<GetEventsEventDto>> {
    const events = await provider.event.getEvents()

    const eventsDto: Array<GetEventsEventDto> = []
    for (const event of events) {
        const user = await provider.user.getUserById(event.user_id)
        if (user) {
            eventsDto.push(mapEventEntityToEventDto(
                event,
                user.login,
                0,
                false
            ))
        }
    }
    return eventsDto
}

export {
    createEvent,
    getEvents
}
