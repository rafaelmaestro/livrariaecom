import { Inject, Injectable } from '@nestjs/common'
import { R, Result, ResultAsync } from '../../../../utils/Result'
import { InvalidPropsException, RepositoryException } from '../../../../utils/exceptions/Exceptions'
import { AppParameterRepository } from '../../../shared/domain/repositories/AppParameterRepository'
import { AppParameterService } from '../../domain/services/AppParameterService.service'

@Injectable()
export class AppParameterServiceImpl implements AppParameterService {
    constructor(
        @Inject('AppParameterRepository')
        private readonly parameterRepository: AppParameterRepository
    ) {}
    private parameters: object = {}

    async onModuleInit() {
        return await this.loadAllParameters()
    }

    async loadAllParameters(): ResultAsync<RepositoryException | InvalidPropsException, void> {
        const parameters = await this.parameterRepository.listAll()

        if (parameters.isFailure()) {
            return R.failure(parameters.error)
        }

        for (const parameter of parameters.value) {
            this.parameters[parameter.getKey()] = parameter.getValue()
        }

        return R.ok()
    }

    async reloadParameter(): ResultAsync<RepositoryException, void> {
        await this.loadAllParameters()
        return R.ok()
    }

    getParameter(parameterName: string): Result<InvalidPropsException, string> {
        const parameterValue: string = this.parameters[parameterName]

        return parameterValue
            ? R.ok(parameterValue)
            : R.failure(new InvalidPropsException(`Parameter ${parameterName} not found!`))
    }

    getParameterList(parameterNames: string[]): Result<InvalidPropsException, object> {
        if (!parameterNames.length) return R.failure(new InvalidPropsException('Parameter Names is required.'))

        const keys = Object.keys(this.parameters)
        const parameterValues = parameterNames
            .filter((parameterName) => keys.includes(parameterName))
            .reduce((result, parameterName) => {
                result[parameterName] = this.parameters[parameterName]
                return result
            }, {})

        return Object.keys(parameterValues).length === parameterNames.length
            ? R.ok(parameterValues)
            : R.failure(
                  new InvalidPropsException(
                      `Parameter ${parameterNames.filter((x) => !keys.includes(x)).join(', ')} not found!`
                  )
              )
    }
}
