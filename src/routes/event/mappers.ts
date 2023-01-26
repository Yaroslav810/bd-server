import {
    EventWithUserAndLikeAndsStaticAndTagAndLinkEntity,
    EventWithUserAndLikeAndStaticEntity,
    EventWithUserAndStaticEntity
} from '../../infrastructure/repositories/event/types'
import {Event, EventWithId} from '../../model/event'
import {GetEventsEventDto} from './schemes/getEvents'
import {GetEventDto} from './schemes/getEvent'
import {CreateEventDto} from './schemes/createEvent'
import {GetLikedEventsDto} from './schemes/getLikedEvents'
import {UpdateEventDto} from './schemes/updateEvent'

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
    event: EventWithUserAndLikeAndsStaticAndTagAndLinkEntity,
    userId: string | null
): GetEventDto {
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
        image: event.EventStatic.length && event.EventStatic[0] ? event.EventStatic[0].static_path : undefined,
        links: event.EventLink.map(link => link.link),
        tags: event.EventTag.map(tag => tag.tag.tag),
        is_like_set: userId ? userIdLikes.includes(userId) : false,
        is_can_delete: userId === event.user.user_id,
        is_can_edit: userId === event.user.user_id
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

function mapUpdateEventDtoToEvent(updateEventDto: UpdateEventDto, image: File | null): EventWithId {
    return {
        id: updateEventDto.id,
        title: updateEventDto.title,
        description: updateEventDto.description || null,
        start: updateEventDto.start,
        duration: updateEventDto.duration,
        price: updateEventDto.price,
        links: updateEventDto.links || null,
        tags: updateEventDto.tags || null,
        detailed: updateEventDto.detailed || null,
        items: updateEventDto.items || null,
        image: image ?? null
    }
}

function mapEventsWithUserEntityToGetLikedEventsDto(
    event: EventWithUserAndStaticEntity
): GetLikedEventsDto {
    return {
        id: event.event_id,
        title: event.title,
        description: event.description || undefined,
        user_name: event.user.login,
        start: event.start,
        duration: event.duration,
        price: event.price || undefined,
        image: event.EventStatic.length && event.EventStatic[0] ? event.EventStatic[0].static_path : undefined,
        participants_count: event.participants_count,
        is_like_set: true
    }
}

function mapEventWithUserAndLikeEntityToGetMyEventsDto(
    event: EventWithUserAndLikeAndStaticEntity,
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
        image: event.EventStatic.length && event.EventStatic[0] ? event.EventStatic[0].static_path : undefined,
        participants_count: event.participants_count,
        is_like_set: likedUserIds.includes(userId)
    }
}

export {
    mapEventWithUserAndLikeEntityToGetEventsEventDto,
    mapEventEntityToGetEventDto,
    mapCreateEventDtoToEvent,
    mapUpdateEventDtoToEvent,
    mapEventsWithUserEntityToGetLikedEventsDto,
    mapEventWithUserAndLikeEntityToGetMyEventsDto
}
