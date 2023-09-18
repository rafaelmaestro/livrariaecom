import Dotenv from 'dotenv'

export function setEnv(aEnvi?: string) {
    if (aEnvi) {
        Dotenv.config({ path: aEnvi })
    } else {
        Dotenv.config({ path: './.env' })
    }
}
