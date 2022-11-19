import {User} from "@prisma/client";
import {PrismaContextType} from "../context";
import {BaseRepository} from "./base";
import {UserType} from "../../model/user";

class UserRepository extends BaseRepository {
    constructor(dbContext: PrismaContextType) {
        super(dbContext)
    }

    async createUser(user: UserType): Promise<User> {
        return await this.dbContext.user.create({
            data: {
                login: user.login,
                first_name: user.first_name,
                password: user.password,
                type: user.type,
            },
        })
    }
}

function initUserRepository(dbContext: PrismaContextType) {
    return new UserRepository(dbContext)
}

export {
    initUserRepository,
}
