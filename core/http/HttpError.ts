import {HttpStatus} from './HttpStatus'

class HttpError extends Error {
    constructor(status: HttpStatus, message = '') {
        super(message)
        this.status = status
        Object.setPrototypeOf(this, HttpError.prototype)
    }

    public readonly status: HttpStatus
}

export {
    HttpError
}
