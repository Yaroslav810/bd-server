import Fastify from 'fastify'
import {settings} from "./core/Settings"
import { PrismaClient } from '@prisma/client'

const fastify = Fastify({
    logger: true
})
const prisma = new PrismaClient()

fastify.get('/', async () => {
    return {
        hello: 'world'
    }
})

fastify.post('/create_user', async () => {
    await prisma.user.create({
        data: {
            login: 'Yaroslav',
            first_name: 'Yaroslav',
            password: 'New password',
            type: "user",
        },
    })
    return null
})

const start = async () => {
    try {
        await fastify.listen({port: settings.APP_PORT})
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
