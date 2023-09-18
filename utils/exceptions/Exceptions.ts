export abstract class Exception extends Error {
    detail: string

    constructor(creationProps?: Error | string) {
        super()
        if (creationProps instanceof Error) {
            this.message = creationProps.message
            this.stack = creationProps.stack
        } else {
            this.detail = creationProps
            this.message = creationProps
        }

        this.name = this.getName()
    }

    abstract getName(): string

    abstract getInstance(): this

    setMessage(message: string): this {
        this.message = message
        return this.getInstance()
    }

    setStack(stack: string): this {
        this.stack = stack
        return this.getInstance()
    }

    setDetail(detail: string): this {
        this.detail = detail
        return this.getInstance()
    }

    toString(): string {
        return `${this.name}: ${this.message}. ${this.detail} - ${this.stack}`
    }
}

export class RepositoryException extends Exception {
    RepositoryException = 'key'

    getMessage(): string {
        return `Error performing action in repository`
    }

    getName(): string {
        return RepositoryException.name
    }

    getInstance(): this {
        return this
    }
}

export class ServiceException extends Exception {
    ServiceException = 'key'

    getMessage(): string {
        return `Error performing action in service`
    }

    getName(): string {
        return ServiceException.name
    }

    getInstance(): this {
        return this
    }
}

export class InvalidPropsException extends Exception {
    InvalidPropsException = 'Key'

    getInstance(): this {
        return this
    }

    getMessage(): string {
        return `Invalid props exception!`
    }

    getName(): string {
        return InvalidPropsException.name
    }
}

export class HttpException extends Exception {
    HttpException = 'Key'
    status: number
    data: any

    getInstance(): this {
        return this
    }

    getMessage(): string {
        return `Erro when trying to make an HTTP request`
    }

    getName(): string {
        return HttpException.name
    }

    setData(data: any): HttpException {
        this.data = data
        return this
    }

    setStatus(status: number): HttpException {
        this.status = status
        return this
    }
}
