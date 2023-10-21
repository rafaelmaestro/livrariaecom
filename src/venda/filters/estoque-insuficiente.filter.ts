import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { EstoqueInsuficienteError } from '../errors/estoque-insuficiente.error'

@Catch(EstoqueInsuficienteError)
export class EstoqueInsuficienteFilter implements ExceptionFilter {
    catch(exception: EstoqueInsuficienteError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse()
        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Não há estoque suficiente para esse produto.',
        })
    }
}
