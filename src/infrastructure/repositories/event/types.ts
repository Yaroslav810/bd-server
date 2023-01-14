import {Event as EventEntity, Like as LikeEntity, User as UserEntity} from '@prisma/client'

interface GetEventsOptions {
    withUser?: boolean,
    withLike?: boolean,
}

type EventWithUserAndLikeEntity = (EventEntity & {user: UserEntity, Like: LikeEntity[]})

type EventWithUserEntity = (EventEntity & {user: UserEntity})

export {
    type EventEntity,
    type LikeEntity,

    type GetEventsOptions,
    type EventWithUserAndLikeEntity,
    type EventWithUserEntity
}
