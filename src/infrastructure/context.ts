import {PrismaClient} from "@prisma/client"

const context = new PrismaClient()

function getPrismaContext() {
    return context
}

type PrismaContextType = typeof context

export {
    type PrismaContextType,
    getPrismaContext,
}
