type UpdateEventDetailedDto = {
    title: string,
    description? :string,
}

type UpdateEventItemsDto = {
    title: string,
    description? :string,
}

type UpdateEventDto = {
    id: string,
    title: string,
    description?: string,
    start: Date,
    duration: number,
    price: number,
    links: string[],
    tags: string[],
    image?: File,
    detailed?: UpdateEventDetailedDto[],
    items?: UpdateEventItemsDto[],
}

const updateEventsScheme = {
    body: {
        type: 'object',
        required: ['data'],
        properties: {
            data: {type: 'string'}
        }
    }
}

export {
    type UpdateEventDto,
    updateEventsScheme
}
