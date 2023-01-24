import {FastifyReply} from 'fastify'
import {FastifyInstance} from 'fastify/types/instance'
import {FastifyRequest} from 'fastify/types/request'

function images(fastify: FastifyInstance, _: RegistrationOptions, done: (err?: Error) => void) {

    fastify.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const {id} = request.params as { id: string }
        return reply.sendFile(id)
    })

    done()
}

export {
    images
}
