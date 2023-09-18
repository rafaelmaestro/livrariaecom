import { R, Result } from '../../../utils/Result'
import { AbstractValueObject } from '../../../utils/domain/AbstractValueObject'
import { InvalidPropsException } from '../../../utils/exceptions/Exceptions'

export interface AppParameterProps {
    key: string
    value: string
}

export class AppParameter extends AbstractValueObject {
    private key: string
    private value: string

    private constructor() {
        super()
    }

    public static create(props: AppParameterProps): Result<InvalidPropsException, AppParameter> {
        const instance = new AppParameter()
        const setKey = instance.setKey(props.key)
        const setValue = instance.setValue(props.value)
        return R.getResult([setKey, setValue], instance)
    }

    getKey(): string {
        return this.key
    }

    getValue(): string {
        return this.value
    }

    private setKey(key: string): Result<InvalidPropsException, void> {
        if (!key) return R.failure(new InvalidPropsException('Key is required'))
        this.key = key
        return R.ok()
    }

    private setValue(value: string): Result<InvalidPropsException, void> {
        if (!value) return R.failure(new InvalidPropsException('Value is required'))
        this.value = value
        return R.ok()
    }
}
