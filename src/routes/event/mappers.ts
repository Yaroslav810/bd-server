import {EventEntity} from '../../infrastructure/repositories/event/types'
import {CreateEventDto, GetEventDto, GetEventsEventDto} from './schemes'
import {Event} from '../../model/event'

function mapEventEntityToGetEventsEventDto(
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

function mapCreateEventDtoToEvent(createEventDto: CreateEventDto): Event {
    return {
        title: createEventDto.title,
        description: createEventDto.description || null,
        start: createEventDto.start,
        duration: createEventDto.duration,
        price: createEventDto.price,
        links: createEventDto.links || null,
        tags: createEventDto.tags || null,
        detailed: createEventDto.detailed || null,
        items: createEventDto.items || null
    }
}

export {
    mapEventEntityToGetEventsEventDto,
    mapEventEntityToGetEventDto,
    mapCreateEventDtoToEvent
}
