import {getDbProvider} from '../../infrastructure/provider'
import {GetEventDto} from '../../routes/event/schemes'
import {mapEventEntityToEventDto} from '../../routes/event/mappers'

const provider = getDbProvider()

async function createEvent(): Promise<boolean> {
    await provider.event.create()
    return true
}

async function getEvents(): Promise<Array<GetEventDto>> {
    const events = await provider.event.getEvents()

    const eventsDto: Array<GetEventDto> = []
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
