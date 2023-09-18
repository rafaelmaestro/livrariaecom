import { Result, ResultAsync } from '../../../../utils/Result'
import { InvalidPropsException, RepositoryException } from '../../../../utils/exceptions/Exceptions'

export interface AppParameterService {
    loadAllParameters(): ResultAsync<RepositoryException | InvalidPropsException, void>
    reloadParameter(): ResultAsync<RepositoryException, void>
    getParameter(parameterName: string): Result<InvalidPropsException, string>
    getParameterList(parameterNames: string[]): Result<InvalidPropsException, any>
}
