import type { Config } from 'jest'

const config: Config = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    roots: ['src'],
    moduleDirectories: ['node_modules', 'src'],
    modulePaths: ['node_modules', '<rootDir>/src'],
    testRegex: '.*\\.spec\\.ts$',
    transform: { '^.+\\.(t|j)s$': 'ts-jest' },
    collectCoverageFrom: [
        './src/**/*.(t|j)s',
        './shared/**/*.(t|j)s',
        '!./src/modules/**/application/command/index.ts',
        '!**/*.module.ts',
        '!**/*.command.ts',
        '!**/*.event.ts',
        '!./src/shared/infra/migrations/*',
        '!**/*.model.ts',
        '!./src/index.ts',
        '!./src/main.ts',
        '!**/*.error.ts',
        '!./src/modules/**/application/useCases/index.ts',
        '!./src/modules/**/application/index.ts',
        '!./src/modules/kafka/infra/services/**',
        '!./src/shared/infra/middleware/**',
        '!./src/shared/infra/api/**',
        '!./src/shared/infra/logger/**',
    ],
    coverageDirectory: './test/coverage',
    testEnvironment: 'node',
    restoreMocks: true,
    clearMocks: true,
    resetMocks: true,
    moduleNameMapper: {
        // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
        uuid: require.resolve('uuid'),
        typeorm: require.resolve('typeorm'),
        getMetadata: require.resolve('reflect-metadata'),
    },
}

export default config
