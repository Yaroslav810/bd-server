interface GetEventDto {
    id: string,
    title: string,
    description?: string,
    user_name: string,
    start: Date,
    duration: number,
    price?: number,
    participants_count: number,
    is_like_set: boolean,
}

const getEventScheme = {}

export {
    type GetEventDto,
    getEventScheme
}
