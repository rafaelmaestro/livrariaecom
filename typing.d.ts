declare namespace NodeJS {
    interface ProcessEnv {
        APP_ENV: string
        APP_PORT: string
        LOG_LEVEL: string
        DB_HOST: string
        DB_PORT: string
        DB_DATABASE: string
        DB_USER: string
        EMAIL_USER: string
        EMAIL_PASSWORD: string
        SMTP_HOST: string
        SMTP_PORT: number
    }
}
