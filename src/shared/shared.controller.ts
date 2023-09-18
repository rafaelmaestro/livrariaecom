import { Controller, Post } from '@nestjs/common'
import { AppParameterService } from './domain/services/AppParameterService.service'
import { NestResponse } from './infra/middleware/http/nestResponse'
import { NestResponseBuilder } from './infra/middleware/http/nestResponseBuilder'

@Controller('shared')
export class SharedController {
    constructor(private readonly appParameterService: AppParameterService) {}

    @Post('clear-cache')
    public async clearCache(): Promise<NestResponse> {
        await this.appParameterService.reloadParameter()
        return new NestResponseBuilder().status(200).body({ message: 'Cache cleared' }).build()
    }
}
