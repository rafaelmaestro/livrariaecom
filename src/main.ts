import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { useContainer } from 'class-validator'
import { json, urlencoded } from 'express'
import { AppModule } from './app.module'
import { TimeoutInterceptor } from './shared/infra/middleware/TimeoutInterceptor.middleware'

export let app: INestApplication
async function bootstrap() {
    app = await NestFactory.create(AppModule, {
        bufferLogs: false,
    })

    app.use(json({ limit: '50mb' }))
    app.use(urlencoded({ extended: true, limit: '50mb' }))
    app.setGlobalPrefix(process.env.npm_package_name)
    app.enableCors({ origin: '*' })

    app.startAllMicroservices()

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    )
    //Faz com que o Nest cuide das injeções de dependencia do Class-Validator
    useContainer(app.select(AppModule), { fallbackOnErrors: true })

    const port = process.env.APP_PORT
    await app.listen(port, () => Logger.log(`🔥🔥 Server started at http://localhost:${port} 🔥🔥`))
    app.useGlobalInterceptors(new TimeoutInterceptor())
}
bootstrap()
