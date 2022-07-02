import { toast } from 'react-toastify';
import { APIErrorObject } from '../utils/api-error-object';

export type SuccessCallbackFunction = (response: Record<string, any>) => void;
export type FailureCallbackFunction = (error: APIErrorObject) => void;

export const defaultFailureCallback: FailureCallbackFunction = (
    error: APIErrorObject
) => {
    toast.error(error.toString());
};

export abstract class GenericService {
    protected handleResponse(
        response: Record<string, any> | APIErrorObject,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        if (response instanceof APIErrorObject) {
            if (!onFail) return;

            return onFail(response);
        }
        if (onSuccess) {
            onSuccess(response);
        }
    }
}
