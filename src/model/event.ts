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
    price: number,
    links: string[] | null,
    tags: string[] | null,
    detailed: EventDetailed[] | null,
    items: EventItem[] | null,
}

export {
    type EventDetailed,
    type EventItem,
    type Event,
}
