import {FastifyInstance} from 'fastify/types/instance'
import {registrationScheme, RegistrationDto, authenticationScheme, AuthenticationDto} from './schemes'
import {checkUser, createUser} from '../../modules/user/actions'
import {mapAuthenticationDtoToUser, mapRegistrationDtoToUser} from './mappers'

function user(fastify: FastifyInstance, _: RegistrationOptions, done: (err?: Error) => void) {

    fastify.post('/registration', {
        schema: registrationScheme
    }, async (request) => {
        const user = mapRegistrationDtoToUser(request.body as RegistrationDto)
        return await createUser(user)
    })

    fastify.post('/authentication', {
        schema: authenticationScheme
    }, async (request) => {
        const user = mapAuthenticationDtoToUser(request.body as AuthenticationDto)
        return await checkUser(user)
    })

    done()
}

export {
    user
}
