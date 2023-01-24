import {
    EventEntity,
    EventWithUserAndLikeAndStaticEntity,
    EventWithUserAndLikeEntity,
    EventWithUserEntity
} from '../../infrastructure/repositories/event/types'
import {Event} from '../../model/event'
import {GetEventsEventDto} from './schemes/getEvents'
import {GetEventDto} from './schemes/getEvent'
import {CreateEventDto} from './schemes/createEvent'
import {GetLikedEventsDto} from './schemes/getLikedEvents'

function mapEventWithUserAndLikeEntityToGetEventsEventDto(
    event: EventWithUserAndLikeAndStaticEntity,
    userId: string | null
): GetEventsEventDto {
    const userIdLikes = event.Like.map(like => like.user_id)

    return {
        id: event.event_id,
        title: event.title,
        description: event.description || undefined,
        user_name: event.user.login,
        start: event.start,
        duration: event.duration,
        price: event.price || undefined,
        participants_count: event.participants_count,
        image: event.EventStatic && event.EventStatic.length && event.EventStatic[0]
            ? event.EventStatic[0].static_path
            : undefined,
        is_like_set: userId ? userIdLikes.includes(userId) : false
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

function mapCreateEventDtoToEvent(createEventDto: CreateEventDto, image: File | null): Event {
    return {
        title: createEventDto.title,
        description: createEventDto.description || null,
        start: createEventDto.start,
        duration: createEventDto.duration,
        price: createEventDto.price,
        links: createEventDto.links || null,
        tags: createEventDto.tags || null,
        detailed: createEventDto.detailed || null,
        items: createEventDto.items || null,
        image: image ?? null
    }
}

function mapEventsWithUserEntityToGetLikedEventsDto(
    event: EventWithUserEntity
): GetLikedEventsDto {
    return {
        id: event.event_id,
        title: event.title,
        description: event.description || undefined,
        user_name: event.user.login,
        start: event.start,
        duration: event.duration,
        price: event.price || undefined,
        participants_count: event.participants_count,
        is_like_set: true
    }
}

function mapEventWithUserAndLikeEntityToGetMyEventsDto(
    event: EventWithUserAndLikeEntity,
    userId: string
): GetLikedEventsDto {
    const likedUserIds = event.Like.map(like => like.user_id)
    return {
        id: event.event_id,
        title: event.title,
        description: event.description || undefined,
        user_name: event.user.login,
        start: event.start,
        duration: event.duration,
        price: event.price || undefined,
        participants_count: event.participants_count,
        is_like_set: likedUserIds.includes(userId)
    }
}

export {
    mapEventWithUserAndLikeEntityToGetEventsEventDto,
    mapEventEntityToGetEventDto,
    mapCreateEventDtoToEvent,
    mapEventsWithUserEntityToGetLikedEventsDto,
    mapEventWithUserAndLikeEntityToGetMyEventsDto
}
