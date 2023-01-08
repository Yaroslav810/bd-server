import {getDbProvider} from '../../infrastructure/provider'
import {User} from '../../model/user'
import {getBcryptPassword} from '../../../core/application/BcryptPassword'
import {UserEntity} from "../../infrastructure/repositories/user/types";

const provider = getDbProvider()

async function createUser(user: User): Promise<boolean> {
    if (!user.login || await provider.user.getUserByLogin(user.login)) {
        return false
    }
    user.password = await getBcryptPassword().getHash(user.password)
    await provider.user.createUser(user)
    return true
}

async function checkUser(user: User): Promise<boolean> {
    if (!user.login) {
        return false
    }
    const currentUser = await provider.user.getUserByLogin(user.login)
    if (!currentUser) {
        return false
    }

    return await getBcryptPassword().compare(user.password, currentUser.password)
}

async function getUserById(userId: string): Promise<UserEntity | null> {
    return await provider.user.getUserById(userId)
}

async function getUserByLogin(login: string): Promise<UserEntity | null> {
    return await provider.user.getUserByLogin(login)
}

export {
    createUser,
    checkUser,
    getUserById,
    getUserByLogin
}
