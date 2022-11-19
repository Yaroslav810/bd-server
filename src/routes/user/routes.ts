import {FastifyInstance} from "fastify/types/instance";
import {registrationScheme, RegistrationDto} from "./schemes";
import {createUser} from "../../modules/user/createUser";
import {mapUserDtoToUser} from "./mappers";

function user(fastify: FastifyInstance, _: RegistrationOptions, done: Function) {

    fastify.post('/registration', {
        schema: registrationScheme,
    }, async (request) => {
        const user = mapUserDtoToUser(request.body as RegistrationDto)
        user.password = await fastify.bcrypt.hash(user.password)
        return await createUser(user)
    })

    done()
}

export {
    user,
}
