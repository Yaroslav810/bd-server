import {FastifyInstance} from 'fastify/types/instance'
import {FastifyRequest} from 'fastify/types/request'
import {sendUnauthorized} from '../../../core/http/httpUtils'

function verifyUser(request: FastifyRequest, fastify: FastifyInstance): string {
    if (!request.headers['x-access-token']) {
        sendUnauthorized()
    }
    const token: {user: string} | null = fastify.jwt.decode(request.headers['x-access-token'] as string)
    if (token) {
        return token.user
    }

    sendUnauthorized()
}

export {
    verifyUser
}
