import {RegistrationDto, RegistrationTypeDto} from "../../routes/user/schemes";
import {User, UserType} from "../../model/user";

function mapUserTypeDtoToUserType(userType: RegistrationTypeDto): UserType {
    switch (userType) {
        case RegistrationTypeDto.company:
            return UserType.company
        case RegistrationTypeDto.user:
            return UserType.user
    }
}

function mapUserDtoToUser(userDto: RegistrationDto): User {
    return {
        login: userDto.login,
        first_name: userDto.first_name,
        last_name: userDto.last_name || null,
        birth_date: userDto.birth_date || null,
        password: userDto.password,
        type: mapUserTypeDtoToUserType(userDto.type),
    }
}

export {
    mapUserDtoToUser,
}
