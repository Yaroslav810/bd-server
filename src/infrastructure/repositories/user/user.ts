import {PrismaContextType} from '../../context'
import {BaseRepository} from '../base'
import {User} from '../../../model/user'
import {UserEntity} from './types'

class UserRepository extends BaseRepository {
    constructor(dbContext: PrismaContextType) {
        super(dbContext)
    }

    async createUser(user: User): Promise<UserEntity> {
        return await this.dbContext.user.create({
            data: {
                login: user.login,
                first_name: user.first_name,
                password: user.password,
                type: user.type
            }
        })
    }

    async getUserById(user_id: string): Promise<UserEntity | null> {
        return await this.dbContext.user.findUnique({
            where: {
                user_id,
            }
        })
    }

    async getUserByLogin(login: string): Promise<UserEntity | null> {
        return await this.dbContext.user.findUnique({
            where: {
                login,
            }
        })
    }
}

function initUserRepository(dbContext: PrismaContextType) {
    return new UserRepository(dbContext)
}

export {
    initUserRepository
}
