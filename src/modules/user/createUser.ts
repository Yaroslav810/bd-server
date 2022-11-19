import {getDbProvider} from "../../infrastructure/provider";
import {User} from "../../model/user";

const provider = getDbProvider();

async function createUser(user: User): Promise<boolean> {
    if (!user.login || await provider.user.getUserByLogin(user.login))
        return false

    await provider.user.createUser(user)
    return true
}

export {
    createUser,
}
