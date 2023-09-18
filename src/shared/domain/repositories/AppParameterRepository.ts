import { ResultAsync } from '../../../../utils/Result'
import { InvalidPropsException, RepositoryException } from '../../../../utils/exceptions/Exceptions'
import { AppParameter } from '../AppParameter'

export interface AppParameterRepository {
    listAll(): ResultAsync<InvalidPropsException | RepositoryException, AppParameter[]>
}
