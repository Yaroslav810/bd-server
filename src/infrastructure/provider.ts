import {getPrismaContext} from './context'
import {initUserRepository} from './repositories/user/user'

class DbProvider {
    private _dbContext = getPrismaContext()

    readonly user = initUserRepository(this._dbContext)
}

let dbProvider = new DbProvider();

function getDbProvider() {
    return dbProvider
}

export {
    getDbProvider
}
