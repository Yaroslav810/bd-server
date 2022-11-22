import {EventEntity} from '../../infrastructure/repositories/event/types'
import {GetEventDto, GetEventsEventDto} from './schemes'

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

function mapEventEntityToGetEventDto(
    event: EventEntity,
    userName: string,
    is_like_set: boolean
): GetEventDto {
    return {
        id: event.event_id,
        title: event.title,
        description: event.description || undefined,
        user_name: userName,
        start: event.start,
        duration: event.duration,
        price: event.price || undefined,
        participants_count: event.participants_count,
        is_like_set
    }
}

export {
    mapEventEntityToEventDto,
    mapEventEntityToGetEventDto
}
