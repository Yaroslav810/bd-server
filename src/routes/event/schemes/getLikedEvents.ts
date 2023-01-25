interface GetLikedEventsDto {
    id: string,
    title: string,
    description?: string,
    user_name: string,
    start: Date,
    duration: number,
    price?: number,
    image?: string,
    participants_count: number,
    is_like_set: boolean,
}

const getLikedEventScheme = {}

export {
    type GetLikedEventsDto,
    getLikedEventScheme
}
