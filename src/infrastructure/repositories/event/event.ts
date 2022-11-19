import {PrismaContextType} from '../../context'
import {BaseRepository} from '../base'
import {EventEntity} from './types'

class EventRepository extends BaseRepository {
    constructor(dbContext: PrismaContextType) {
        super(dbContext)
    }

    async create(): Promise<EventEntity> {
        return await this.dbContext.event.create({
            data: {
                title: '',
                description: '',
                start: new Date(),
                duration: 0,
                user_id: 'd8beac63-9c83-4e3c-9485-7069988b9f4c',
                participants_count: 0,
                price: undefined,
            }
        })
    }

    async getEvents(): Promise<Array<EventEntity>> {
        return await this.dbContext.event.findMany()
    }
}

function initEventRepository(dbContext: PrismaContextType) {
    return new EventRepository(dbContext)
}

export {
    initEventRepository
}
