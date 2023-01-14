interface LikedEventDto {
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

const likedScheme = {}

export {
    type LikedEventDto,
    likedScheme
}
