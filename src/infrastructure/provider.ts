import {getPrismaContext} from './context'
import {initUserRepository} from './repositories/user/user'
import {initEventRepository} from './repositories/event/event'

class DbProvider {
    private _dbContext = getPrismaContext()

    readonly user = initUserRepository(this._dbContext)
    readonly event = initEventRepository(this._dbContext)
}

const dbProvider = new DbProvider()

function getDbProvider() {
    return dbProvider
}

export {
    getDbProvider
}
