import { AppParameter } from '../AppParameter'

const appParameter = AppParameter.create({
    key: 'TEST_KEY',
    value: 'TEST_VALUE',
})

export const mockAppParameter = {
    create: () => {
        if (appParameter.isOk()) return appParameter.value
    },
}
