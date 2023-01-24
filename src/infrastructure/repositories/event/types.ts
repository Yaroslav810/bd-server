import {Event as EventEntity, Like as LikeEntity, User as UserEntity, EventStatic as EventStaticEntity} from '@prisma/client'

interface GetEventsOptions {
    withUser?: boolean,
    withLike?: boolean,
}

type EventWithUserAndLikeAndStaticEntity = (EventEntity & {user: UserEntity, Like: LikeEntity[], EventStatic: EventStaticEntity[]})

type EventWithUserAndLikeEntity = (EventEntity & {user: UserEntity, Like: LikeEntity[]})

type EventWithUserEntity = (EventEntity & {user: UserEntity})

export {
    type EventEntity,
    type LikeEntity,

    type GetEventsOptions,
    type EventWithUserAndLikeAndStaticEntity,
    type EventWithUserAndLikeEntity,
    type EventWithUserEntity
}
