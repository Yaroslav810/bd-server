import {getPrismaContext} from "./context";
import {initUserRepository} from "./repositories/user";

class DbProvider {
    private _dbContext = getPrismaContext()


    readonly user = initUserRepository(this._dbContext)
}

export {
    DbProvider,
}
