import {
    FailureCallbackFunction,
    GenericService,
    SuccessCallbackFunction,
} from '.';
import APIClient from '../utils/api-client';

export interface IEditProfile {
    faculty: string,
    campus: string,
    sex: string,
    password: string,
    new_password: string,
}

class ProfileService extends GenericService {
    public async updateProfile (
        data: IEditProfile,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction,
    ) {
        const response = await APIClient.POST('/users/my-account', data);
    
        this.handleResponse(response, onSuccess, onFail);
    }
}

const service = new ProfileService()
export default service;