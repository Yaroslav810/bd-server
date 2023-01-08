import {FastifyInstance} from 'fastify/types/instance'
import {
    registrationScheme,
    RegistrationDto,
    authenticationScheme,
    AuthenticationDto,
    currentUserScheme, logoutScheme
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
        const user = mapAuthenticationDtoToUser(request.body as AuthenticationDto)
        const result = await checkUser(user)
        if (result) {
            // @ts-ignore
            request.session.userId = (await getUserByLogin(user.login)).user_id
        }
        return result
    })

    fastify.post('/current-user', {
        schema: currentUserScheme
    }, async (request) => {
        // @ts-ignore
        const userId = request.session.userId
        if (userId) {
            const user = await getUserById(userId)
            return user ? mapUserEntityToCurrentUserDto(user) : null
        }
        return null
    })

    fastify.post('/logout', {
        schema: logoutScheme
    }, async (request) => {
        // @ts-ignore
        let data = request.session.userId
        if (!data) {
            return false
        }
        // @ts-ignore
        request.session.userId = null
        return true
    })

    done()
}

export {
    user
}
