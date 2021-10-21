export default class JsonResponse {
    readonly statusCode: number
    readonly data: object

    constructor(statusCode: number, data: object) {
        this.statusCode = statusCode
        this.data = data
    }
}