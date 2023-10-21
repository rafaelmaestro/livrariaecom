import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { CarrinhoPagoError } from '../errors/carrinho-pago.error'

@Catch(CarrinhoPagoError)
export class CarrinhoPagoFilter implements ExceptionFilter {
    catch(exception: CarrinhoPagoError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse()
        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Este carrinho já está pago e não pode ser alterado.',
        })
    }
}
