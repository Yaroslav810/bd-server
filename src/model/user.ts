enum UserType {
    user = 'user',
    company = 'company'
}

interface User {
    login: string
    first_name: string
    last_name: string | null
    birth_date: Date | null
    password: string
    type: UserType
}

export {
    type User,
    UserType
}
