import { Module } from '@nestjs/common'
import { SharedController } from './shared.controller'

@Module({
    controllers: [SharedController],
    providers: [],
    exports: [],
})
export class SharedModule {}
