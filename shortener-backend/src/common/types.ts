import { TypeORMError } from "typeorm";

export type TAsyncResultTuple<T> = Promise<[Error | null | unknown, T | null]>;
export type TAsyncTypeORMResultTuple<T> = Promise<[TypeORMError | null, T | null]>;