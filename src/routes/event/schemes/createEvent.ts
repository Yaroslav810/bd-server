type CreateEventDetailedDto = {
    title: string,
    description? :string,
}

type CreateEventItemsDto = {
    title: string,
    description? :string,
}

type CreateEventDto = {
    title: string,
    description?: string,
    start: Date,
    duration: number,
    price: number,
    participantsCount: number,
    links: string[],
    tags: string[],
    image?: File,
    detailed?: CreateEventDetailedDto[],
    items?: CreateEventItemsDto[],
}

const createEventsScheme = {
    body: {
        type: 'object',
        required: ['data'],
        properties: {
            data: {type: 'string'}
        }
    }
}

export {
    type CreateEventDto,
    createEventsScheme
}
