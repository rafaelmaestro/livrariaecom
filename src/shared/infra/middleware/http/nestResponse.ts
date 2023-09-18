export class NestResponse {
    status: number
    headers: object
    body: object

    constructor(response: NestResponse) {
        Object.assign(this, response)
    }
}
