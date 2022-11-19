import {PrismaContextType} from '../../context'
import {BaseRepository} from '../base'
import {EventEntity} from './types'

class EventRepository extends BaseRepository {
    constructor(dbContext: PrismaContextType) {
        super(dbContext)
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
