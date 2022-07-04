import APIClient from '../utils/api-client';
import { APIErrorObject } from '../utils/api-error-object';

type SuccessCallbackFunction = (response: Record<string, any>) => void;
type FailureCallbackFunction = (error: APIErrorObject) => void;

class AuthService {
    public async login(
        nim: string,
        password: string,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.POST('/auth/local', {
            identifier: nim,
            password,
        });

        if (response instanceof APIErrorObject) {
            if (!onFail) return;

            return onFail(response);
        }

        APIClient.setToken(response.jwt);
        if (onSuccess) {
            onSuccess(response);
        }
    }

    public logout(
        onSuccess?: SuccessCallbackFunction,) {
        APIClient.deleteCookie("token");
        if (onSuccess) {
            onSuccess({});
        }
    }
}

const service = new AuthService();
export default service;
