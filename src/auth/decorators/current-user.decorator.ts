import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Usuario } from '../../usuario/entities/usuario.entity'
import { AuthRequest } from '../interfaces/AuthRequest'

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): Usuario => {
    const request = context.switchToHttp().getRequest<AuthRequest>()

    return request.user
})
