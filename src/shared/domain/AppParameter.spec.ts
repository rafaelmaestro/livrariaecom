import { AppParameter } from './AppParameter'

describe(`${AppParameter.name} suite`, () => {
    it('should be defined', () => {
        expect(AppParameter).toBeDefined()
    })
    describe(`${AppParameter.create.name} method`, () => {
        it('should create a valid AppParameter', () => {
            const appParameter = AppParameter.create({
                key: 'TEST_KEY',
                value: 'TEST_VALUE',
            })
            expect(appParameter.isOk()).toBeTruthy()
        })
        it('should fail if key is empty', () => {
            const appParameter = AppParameter.create({
                key: null,
                value: 'TEST_VALUE',
            })
            expect(appParameter.isFailure()).toBeTruthy()
        })
        it('should fail if value is empty', () => {
            const appParameter = AppParameter.create({
                key: 'TEST_KEY',
                value: null,
            })
            expect(appParameter.isFailure()).toBeTruthy()
        })
    })
    describe(`${AppParameter.prototype.getKey.name} method`, () => {
        it('should getting key from AppParameter class domain.', () => {
            const appParameter = AppParameter.create({
                key: 'TEST_KEY',
                value: 'TEST_VALUE',
            })
            let result
            if (appParameter.isOk()) result = appParameter.value.getKey()
            expect(appParameter.isOk()).toBeTruthy()
            expect(result).toEqual('TEST_KEY')
        })
        it('should getting value from AppParameter class domain.', () => {
            const appParameter = AppParameter.create({
                key: 'TEST_KEY',
                value: 'TEST_VALUE',
            })
            let result
            if (appParameter.isOk()) result = appParameter.value.getValue()
            expect(appParameter.isOk()).toBeTruthy()
            expect(result).toEqual('TEST_VALUE')
        })
    })
})
