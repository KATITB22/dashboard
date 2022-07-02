import APIClient from '../utils/api-client';
import { GenericService } from '.';
import { APIErrorObject } from '../utils/api-error-object';

type SuccessCallbackFunction = (response: Record<string, any>) => void;
type FailureCallbackFunction = (error: APIErrorObject) => void;

export interface IGroup {
    name: string,
    leaders: number[],
    members: number[],
}

class GroupService extends GenericService {
    public async uploadGroup (
        data: IGroup,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.POST('/groups', data);

        this.handleResponse(response, onSuccess, onFail);
    }

    public async deleteAll (
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.DELETE('/groups');

        this.handleResponse(response, onSuccess, onFail);
    }
}

const service = new GroupService();
export default service