import { Request } from 'express'
import { Usuario } from '../../usuario/entities/usuario.entity'

export interface AuthRequest extends Request {
    user: Usuario
}
