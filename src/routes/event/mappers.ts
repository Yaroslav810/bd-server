import {EventEntity} from '../../infrastructure/repositories/event/types'
import {GetEventsEventDto} from './schemes'

function mapEventEntityToEventDto(
    event: EventEntity,
    userName: string,
    participantsCount: number,
    isLikeSet: boolean
): GetEventsEventDto {
    return {
        id: event.event_id,
        title: event.title,
        description: event.description || undefined,
        user_name: userName,
        start: event.start,
        duration: event.duration,
        price: event.price || undefined,
        participants_count: participantsCount,
        is_like_set: isLikeSet
    }
}

export {
    mapEventEntityToEventDto
}
