import {FastifyInstance} from "fastify/types/instance";
import {initBcryptPassword} from "./BcryptPassword";

function initApplication(application: FastifyInstance) {
    initBcryptPassword(application.bcrypt)
}

export {
    initApplication,
}
