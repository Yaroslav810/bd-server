interface GetEventsEventDto {
    id: string,
    title: string,
    description?: string,
    user_name: string,
    start: Date,
    duration: number,
    price?: number,
    participants_count: number,
    image?: string,
    is_like_set: boolean,
}

const getEventsScheme = {}

export {
    type GetEventsEventDto,
    getEventsScheme
}
