interface EventDetailed {
    title: string,
    description? :string,
}

interface EventItem {
    title: string,
    description?: string,
}

interface Event {
    title: string,
    description: string | null,
    start: Date,
    duration: number,
    participantsCount: number,
    price: number,
    links: string[] | null,
    tags: string[] | null,
    detailed: EventDetailed[] | null,
    items: EventItem[] | null,
    image: File | null,
}

interface EventWithId {
    id: string,
    title: string,
    description: string | null,
    start: Date,
    duration: number,
    participantsCount: number,
    price: number,
    links: string[] | null,
    tags: string[] | null,
    detailed: EventDetailed[] | null,
    items: EventItem[] | null,
    image: File | null,
}

export {
    type EventDetailed,
    type EventItem,
    type Event,
    type EventWithId
}
