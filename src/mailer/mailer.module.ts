import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { setEnv } from '../../config'
import { EMailerService } from './mailer.service'
setEnv()

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            },
        }),
    ],
    controllers: [],
    providers: [EMailerService],
    exports: [EMailerService],
})
export class EMailerModule {}
