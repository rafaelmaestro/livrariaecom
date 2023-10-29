import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { setEnv } from '../../config'
import { EMailerService } from './mailer.service'
setEnv()

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            },
        }),
    ],
    controllers: [],
    providers: [EMailerService],
    exports: [EMailerService],
})
export class EMailerModule {}
