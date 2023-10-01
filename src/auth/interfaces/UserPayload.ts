export interface UserPayload {
    sub: number
    cpf: string
    email: string
    nome: string
    iat?: number
    exp?: number
}
