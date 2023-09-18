import { Exception } from './exceptions/Exceptions'

export type Result<L, A> = Failure<L, A> | Ok<L, A>
export type ResultAsync<L, A> = Promise<Result<L, A>>

interface IResult<L, A> {
    /**
     * Used to check if a `Result` is an `OK`
     *
     * @returns `true` if the result is an `OK` variant of Result
     */
    isOk(): this is Ok<L, A>

    /**
     * Used to check if a `Result` is an `Err`
     *
     * @returns `true` if the result is an `Err` variant of Result
     */
    isFailure(): this is Failure<L, A>
}

export class Failure<L, A> implements IResult<L, A> {
    readonly error: L

    constructor(error: L) {
        this.error = error
    }

    isFailure(): this is Failure<L, A> {
        return true
    }

    isOk(): this is Ok<L, A> {
        return false
    }

    applyOnRight<B>(_: (a: A) => B): Result<L, B> {
        return this as any
    }
}

export class Ok<L, A> implements IResult<L, A> {
    readonly value: A

    constructor(value?: A) {
        this.value = value
    }

    isFailure(): this is Failure<L, A> {
        return false
    }

    isOk(): this is Ok<L, A> {
        return true
    }

    applyOnRight<B>(func: (a: A) => B): Result<L, B> {
        return new Ok(func(this.value))
    }
}

export abstract class R {
    public static ok<A = void, L = any>(value?: A): Result<L, A> {
        return new Ok(value)
    }

    public static failure<L extends Exception, A>(value: L): Result<L, A> {
        return new Failure(value)
    }

    public static isOk<L, A>(eitherList: Array<IResult<L, A>>): boolean {
        return eitherList.find((either) => either.isFailure()) ? false : true
    }

    public static hasFailure<L, A = any>(either: IResult<L, A> | IResult<L, A>[]): boolean {
        if (Array.isArray(either)) {
            return either.find((e) => e.isFailure()) ? true : false
        } else {
            return either.isOk() ? false : true
        }
    }

    public static listFailure<L, A = any>(either: IResult<L, A>[]): Failure<L[], A> {
        const errors: L[] = []
        for (const l of either) {
            if (l.isFailure()) {
                errors.push(l.error)
            }
        }

        return new Failure<L[], A>(errors)
    }

    public static getFailure<L, A = any>(either: IResult<L, A>[]): Failure<L, A> {
        return either.find((e) => e.isFailure()) as Failure<L, A>
    }

    public static getValue<L, A = any>(either: IResult<L, A>): A {
        if (either.isOk()) return either.value
        else throw new Error(`Either dont have value`)
    }

    public static getResult<L, A>(eitherList: IResult<L, unknown>[], rightValue: A): Result<L, A> {
        return this.hasFailure(eitherList) ? this.getFailure<L>(eitherList) : new Ok(rightValue)
    }
}
