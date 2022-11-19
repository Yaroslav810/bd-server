enum RegistrationTypeDto {
    'user' = 'user',
    'company' = 'company'
}

interface RegistrationDto {
    login: string,
    first_name: string,
    last_name?: string,
    birth_date?: Date,
    password: string,
    type: RegistrationTypeDto,
}

const registrationScheme = {
    body: {
        type: 'object',
        required: ['login', 'first_name', 'password', 'type'],
        properties: {
            login: {type: 'string'},
            first_name: {type: 'string'},
            last_name: {type: 'string'},
            birth_date: {type: 'string', format: 'date'},
            password: {type: 'string'},
            type: {
                type: 'string',
                enum: ['user', 'company']
            }
        }
    }
}

interface AuthenticationDto {
    login: string,
    password: string,
}

const authenticationScheme = {
    body: {
        type: 'object',
        required: ['login', 'password'],
        properties: {
            login: {type: 'string'},
            password: {type: 'string'}
        }
    }
}

export {
    RegistrationTypeDto,
    type RegistrationDto,
    registrationScheme,

    type AuthenticationDto,
    authenticationScheme
}
