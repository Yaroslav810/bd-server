import {FastifyInstance} from "fastify/types/instance";
import {getScheme} from "./schemes";
import {getEvents} from "../../modules/event/actions";

function event(fastify: FastifyInstance, _: RegistrationOptions, done: Function) {

    fastify.post('/get', {
        schema: getScheme,
    }, async () => {
        return await getEvents()
    })

    done()
}

export {
    event,
}
