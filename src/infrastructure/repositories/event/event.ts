import {PrismaContextType} from '../../context'
import {BaseRepository} from '../base'
import {EventEntity} from './types'
import {Event} from "../../../model/event";

class EventRepository extends BaseRepository {
    constructor(dbContext: PrismaContextType) {
        super(dbContext)
    }

    async create(event: Event, userId: string): Promise<EventEntity> {
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
                                tag,
                            },
                        },
                    }))
                },
                EventLink: {
                    create: event.links?.map(link => ({
                        link,
                    }))
                },
                EventDetailed: {
                    create: event.detailed?.map((detailed, index) => ({
                        title: detailed.title,
                        description: detailed.description,
                        order: index,
                    }))
                },
                ItemForEvent: {
                    create: event.items?.map(item => ({
                        item: {
                            create: {
                                title: item.title,
                                description: item.description,
                            }
                        }
                    }))
                }
            }
        })
    }

    async getEvents(): Promise<Array<EventEntity>> {
        return await this.dbContext.event.findMany()
    }

    async getEvent(event_id: string): Promise<EventEntity | null> {
        return await this.dbContext.event.findUnique({
            where: {
                event_id
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
