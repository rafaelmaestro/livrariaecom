import { Injectable } from '@nestjs/common'
import { R, Result } from '../../../../utils/Result'
import { InvalidPropsException } from '../../../../utils/exceptions/Exceptions'
import { AppParameter } from '../../domain/AppParameter'
import { AppParameterModel } from '../models/AppParameter.model'

@Injectable()
export class AppParameterMapper {
    modelToDomain(model: AppParameterModel): Result<InvalidPropsException, AppParameter> {
        const domain: Result<InvalidPropsException, AppParameter> = AppParameter.create({
            key: model.key,
            value: model.value,
        })

        if (domain.isFailure()) throw domain.error
        return R.ok(domain.value)
    }

    domainToModel(domain: AppParameter): Result<InvalidPropsException, AppParameterModel> {
        const model: AppParameterModel = new AppParameterModel()
        model.setProps({
            key: domain.getKey(),
            value: domain.getValue(),
        })

        return R.ok(model)
    }
}
