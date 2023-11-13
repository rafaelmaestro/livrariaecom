import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { UsuarioExistenteError } from '../errors/usuario-existente.error'

@Catch(UsuarioExistenteError)
export class UsuarioExistenteFilter implements ExceptionFilter {
    catch(exception: UsuarioExistenteError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse()
        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Usuário já cadastrado.',
        })
    }
}
