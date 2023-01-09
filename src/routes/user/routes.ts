import {FastifyInstance} from 'fastify/types/instance'
import {
    registrationScheme,
    RegistrationDto,
    authenticationScheme,
    AuthenticationDto,
    currentUserScheme
} from './schemes'
import {checkUser, createUser, getUserById, getUserByLogin} from '../../modules/user/actions'
import {mapAuthenticationDtoToUser, mapRegistrationDtoToUser, mapUserEntityToCurrentUserDto} from './mappers'

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
        if (request.user) {
            return null
        }
        const user = mapAuthenticationDtoToUser(request.body as AuthenticationDto)
        const result = await checkUser(user)
        if (result) {
            const currentUser = await getUserByLogin(user.login)
            return currentUser ? fastify.jwt.sign({user: currentUser.user_id}) : null
        }
        return null
    })

    fastify.post('/current-user', {
        schema: currentUserScheme
    }, async (request) => {
        if (request.headers['x-access-token']) {
            const token: {user: string} | null = fastify.jwt.decode(request.headers['x-access-token'] as string)
            if (token) {
                const user = await getUserById(token.user)
                return user ? mapUserEntityToCurrentUserDto(user) : null
            }
        }
        return null
    })

    done()
}

export {
    user
}
