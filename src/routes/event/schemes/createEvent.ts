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
    links?: string[],
    tags?: string[],
    detailed?: CreateEventDetailedDto[],
    items?: CreateEventItemsDto[],
}

const createEventsScheme = {
    body: {
        type: 'object',
        required: ['title', 'start', 'price'],
        properties: {
            title: {type: 'string'},
            description: {type: 'string'},
            start: {type: 'string', format: 'date-time'},
            duration: {type: 'number'},
            price: {type: 'number'},
            links: {type: 'array', items: {type: 'string'}},
            tags: {type: 'array', items: {type: 'string'}},
            detailed: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        title: {type: 'string'},
                        description: {type: 'string'}
                    }
                }},
            items: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        title: {type: 'string'},
                        description: {type: 'string'}
                    }
                }}
        }
    }
}

export {
    type CreateEventDto,
    createEventsScheme
}
