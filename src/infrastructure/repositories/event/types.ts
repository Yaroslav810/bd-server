import {
    Event as EventEntity,
    Like as LikeEntity,
    User as UserEntity,
    EventStatic as EventStaticEntity,
    EventTag as EventTagEntity,
    EventLink as EventLinkEntity,
    Tag as TagEntity
} from '@prisma/client'

interface GetEventsOptions {
    withUser?: boolean,
    withLike?: boolean,
}

type EventWithUserAndLikeAndStaticEntity = (EventEntity & {user: UserEntity, Like: LikeEntity[], EventStatic: EventStaticEntity[]})

type EventWithUserAndLikeAndsStaticAndTagAndLinkEntity = (EventEntity & {
    user: UserEntity,
    Like: LikeEntity[],
    EventStatic: EventStaticEntity[],
    EventTag: (EventTagEntity & {tag: TagEntity})[],
    EventLink: EventLinkEntity[]})

type EventWithStaticEntity = (EventEntity & {EventStatic: EventStaticEntity[]})

type EventWithUserAndStaticEntity = (EventEntity & {user: UserEntity, EventStatic: EventStaticEntity[]})

type EventWithUserEntity = (EventEntity & {user: UserEntity})

export {
    type EventEntity,
    type LikeEntity,

    type GetEventsOptions,
    type EventWithUserAndLikeAndsStaticAndTagAndLinkEntity,
    type EventWithUserAndLikeAndStaticEntity,
    type EventWithUserAndStaticEntity,
    type EventWithStaticEntity,
    type EventWithUserEntity
}
