type BcryptPasswordType = { hash: (pwd: string) => Promise<string>, compare: (data: string, hash: string) => Promise<boolean> }

let bcryptPassword: BcryptPassword | null = null

class BcryptPassword {
    constructor(bcrypt: BcryptPasswordType) {
        this.bcrypt = bcrypt
    }

    getHash(pwd: string): Promise<string> {
        return this.bcrypt.hash(pwd)
    }

    compare(data: string, hash: string): Promise<boolean> {
        return this.bcrypt.compare(data, hash)
    }

    private readonly bcrypt: BcryptPasswordType;
}

function initBcryptPassword(bcrypt: BcryptPasswordType) {
    bcryptPassword = new BcryptPassword(bcrypt)
}

function getBcryptPassword() {
    if (!bcryptPassword) {
        throw Error();
    }
    return bcryptPassword
}

export {
    initBcryptPassword,
    getBcryptPassword,
}
