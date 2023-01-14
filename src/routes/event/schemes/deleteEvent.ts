const deleteEventScheme = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: {type: 'string'}
        }
    }
}

export {
    deleteEventScheme
}
