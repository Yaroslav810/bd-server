import {PrismaContextType} from "../context";

abstract class BaseRepository {
    protected constructor(dbContext: PrismaContextType) {
        this.dbContext = dbContext
    }

    protected readonly dbContext: PrismaContextType
}

export {
    BaseRepository
}
