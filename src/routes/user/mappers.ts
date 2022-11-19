import {User, UserType} from '../../model/user'
import {AuthenticationDto, RegistrationDto, RegistrationTypeDto} from './schemes'

function mapRegistrationTypeDtoToUserType(registrationType: RegistrationTypeDto): UserType {
    switch (registrationType) {
        case RegistrationTypeDto.company:
            return UserType.company
        case RegistrationTypeDto.user:
            return UserType.user
    }
}

function mapRegistrationDtoToUser(registrationTypeDto: RegistrationDto): User {
    return {
        login: registrationTypeDto.login,
        first_name: registrationTypeDto.first_name,
        last_name: registrationTypeDto.last_name || null,
        birth_date: registrationTypeDto.birth_date || null,
        password: registrationTypeDto.password,
        type: mapRegistrationTypeDtoToUserType(registrationTypeDto.type)
    }
}

function mapAuthenticationDtoToUser(authenticationDto: AuthenticationDto): User {
    return {
        login: authenticationDto.login,
        password: authenticationDto.password,
        first_name: '',
        last_name: null,
        birth_date: null,
        type: UserType.user
    }
}

export {
    mapRegistrationDtoToUser,
    mapAuthenticationDtoToUser
}
