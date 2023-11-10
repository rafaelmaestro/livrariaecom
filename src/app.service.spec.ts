import { AppService } from './app.service'

const sutFactory = () => {
    const sut = new AppService()
    return { sut }
}
describe(`${AppService.name} suite`, () => {
    it(`deve estar definido`, () => {
        const { sut } = sutFactory()
        expect(sut).toBeDefined()
    })

    describe(`${AppService.prototype.getHello.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.getHello).toBeDefined()
        })

        it(`deve retornar a mensagem "Hello World!"`, () => {
            const { sut } = sutFactory()
            expect(sut.getHello()).toBe('Hello World!')
        })
    })
})
