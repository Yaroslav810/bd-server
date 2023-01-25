import {PrismaContextType} from '../../context'
import {BaseRepository} from '../base'
import {
    EventEntity,
    EventWithStaticAndTagAndLinkEntity,
    EventWithUserAndLikeAndStaticEntity,
    EventWithUserAndLikeEntity,
    EventWithUserEntity,
    GetEventsOptions,
    LikeEntity
} from './types'
import {Event} from '../../../model/event'

class EventRepository extends BaseRepository {
    constructor(dbContext: PrismaContextType) {
        super(dbContext)
    }

    async create(event: Event, userId: string, title: string | null): Promise<EventEntity> {
        return await this.dbContext.event.create({
            data: {
                title: event.title,
                description: event.description,
                start: event.start,
                duration: event.duration,
                user_id: userId,
                price: event.price,
                participants_count: 0,
                EventTag: {
                    create: event.tags?.map(tag => ({
                        tag: {
                            create: {
                                tag
                            }
                        }
                    }))
                },
                EventLink: {
                    create: event.links?.map(link => ({
                        link
                    }))
                },
                EventDetailed: {
                    create: event.detailed?.map((detailed, index) => ({
                        title: detailed.title,
                        description: detailed.description,
                        order: index
                    }))
                },
                ItemForEvent: {
                    create: event.items?.map(item => ({
                        item: {
                            create: {
                                title: item.title,
                                description: item.description
                            }
                        }
                    }))
                },
                EventStatic: {
                    create: title
                        ? {
                            static_path: title
                        }
                        : undefined
                }
            }
        })
    }

    async delete(eventId: string): Promise<EventEntity> {
        return await this.dbContext.event.delete({
            where: {
                event_id: eventId
            }
        })
    }

    async getEvents(options: GetEventsOptions): Promise<Array<EventWithUserAndLikeAndStaticEntity>> {
        return await this.dbContext.event.findMany({
            include: {
                user: options.withUser,
                Like: options.withLike,
                EventStatic: true
            }
        })
    }

    async getEvent(eventId: string): Promise<EventWithStaticAndTagAndLinkEntity | null> {
        return await this.dbContext.event.findUnique({
            where: {
                event_id: eventId
            },
            include: {
                EventStatic: true,
                EventTag: {
                    include: {
                        tag: true
                    }
                },
                EventLink: true
            }
        })
    }

    async getLike(eventId: string, userId: string): Promise<LikeEntity | null> {
        return await this.dbContext.like.findFirst({
            where: {
                event_id: eventId,
                user_id: userId
            }
        })
    }

    async addLike(eventId: string, userId: string) {
        return await this.dbContext.like.create({
            data: {
                event_id: eventId,
                user_id: userId
            }
        })
    }

    async removeLike(likeId: string) {
        return await this.dbContext.like.delete({
            where: {
                like_id: likeId
            }
        })
    }

    async getLikesByUserId(userId: string): Promise<Array<LikeEntity>> {
        return await this.dbContext.like.findMany({
            where: {
                user_id: userId
            }
        })
    }

    async getEventsById(eventIds: Array<string>): Promise<Array<EventWithUserEntity>> {
        return await this.dbContext.event.findMany({
            where: {
                event_id: {
                    in: eventIds
                }
            },
            include: {
                user: true
            }
        })
    }

    async getEventsByUserId(userId: string): Promise<Array<EventWithUserAndLikeEntity>> {
        return await this.dbContext.event.findMany({
            where: {
                user: {
                    user_id: userId
                }
            },
            include: {
                user: true,
                Like: true
            }
        })
    }
}

function initEventRepository(dbContext: PrismaContextType) {
    return new EventRepository(dbContext)
}

export {
    initEventRepository
}
