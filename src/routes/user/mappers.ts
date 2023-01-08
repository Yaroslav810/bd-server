import {User, UserType} from '../../model/user'
import {AuthenticationDto, CurrentUserDto, RegistrationDto, UserTypeDto} from './schemes'
import {UserEntity, UserTypeEntity} from '../../infrastructure/repositories/user/types'

function mapRegistrationTypeDtoToUserType(registrationType: UserTypeDto): UserType {
    switch (registrationType) {
        case UserTypeDto.company:
            return UserType.company
        case UserTypeDto.user:
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

function mapUserTypeDtoToUserType(userTypeEntity: UserTypeEntity): UserTypeDto {
    switch (userTypeEntity) {
        case 'company':
            return UserTypeDto.company
        case 'user':
            return UserTypeDto.user
    }
}

function mapUserEntityToCurrentUserDto(userEntity: UserEntity): CurrentUserDto {
    return {
        id: userEntity.user_id,
        login: userEntity.login,
        firstName: userEntity.first_name,
        lastName: userEntity.last_name,
        type: mapUserTypeDtoToUserType(userEntity.type)
    }
}

export {
    mapRegistrationDtoToUser,
    mapAuthenticationDtoToUser,
    mapUserEntityToCurrentUserDto
}
