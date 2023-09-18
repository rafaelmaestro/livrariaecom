import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from '@nestjs/common'
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { NestResponse } from './nestResponse'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    private httpAdapter: AbstractHttpAdapter

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((responseController: NestResponse) => {
                if (responseController instanceof NestResponse) {
                    const ctx = context.switchToHttp()
                    const response = ctx.getResponse()
                    const { headers, status, body } = responseController

                    const headersName = Object.getOwnPropertyNames(headers)

                    headersName.forEach((name) => {
                        const value = headers[name]
                        this.httpAdapter.setHeader(response, name, value)
                    })

                    this.httpAdapter.status(response, status)

                    return body
                }

                return responseController
            })
        )
    }
}
