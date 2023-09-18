import { Inject, Injectable } from '@nestjs/common'
import { R, ResultAsync } from '../../../../utils/Result'
import { InvalidPropsException, RepositoryException } from '../../../../utils/exceptions/Exceptions'
import { AppParameter } from '../../domain/AppParameter'
import { AppParameterRepository } from '../../domain/repositories/AppParameterRepository'
import { AppParameterMapper } from '../mapper/AppParameter.mapper'
import { AppParameterModel } from '../models/AppParameter.model'

@Injectable()
export class AppParameterRepositoryImpl implements AppParameterRepository {
    constructor(
        @Inject('AppParameterMapper')
        private readonly parameterMapper: AppParameterMapper
    ) {}

    async listAll(): ResultAsync<InvalidPropsException | RepositoryException, AppParameter[]> {
        const parameters: AppParameterModel[] = await AppParameterModel.find()
        if (parameters.length <= 0) return R.failure(new RepositoryException('No parameters found!'))
        const result = []
        for (const parameter of parameters) {
            const domain = this.parameterMapper.modelToDomain(parameter)
            if (domain.isFailure()) return R.failure(new RepositoryException().setStack(domain.error.stack))
            result.push(domain.value)
        }
        return R.ok(result)
    }
}
