import { APIErrorObject } from '../utils/api-error-object';

export type SuccessCallbackFunction = (response: Record<string, any>) => void;
export type FailureCallbackFunction = (error: APIErrorObject) => void;
