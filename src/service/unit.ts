import {
    FailureCallbackFunction,
    GenericService,
    SuccessCallbackFunction,
} from '.';
import APIClient from '../utils/api-client';
import { APIErrorObject } from '../utils/api-error-object';

class UnitService extends GenericService {
    public async updateScore(
        username: string,
        usernameUnit: string,
        score: number,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const data = {
            username,
            score,
            username_unit: usernameUnit,
        };
        const response = await APIClient.PUT('/units/score', data);
        this.handleResponse(response, onSuccess, onFail);
    }

    public async getMyScore(
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET('/users/me');
        const result = {
            score: response.score,
            username: response.username,
        };
        this.handleResponse(result, onSuccess, onFail);
    }

    public async findParticipant(
        search: string,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET(
            `/units/participant?search=${search}`
        );
        this.handleResponse(response, onSuccess, onFail);
    }

    public async getLiveStatus(
        unit: string,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET(`/units/live?name=${unit}`);
        this.handleResponse(response, onSuccess, onFail);
    }

    public async updateLiveStatus(
        unit: string,
        status: boolean,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const data = {
            name: unit,
            status,
        };
        const response = await APIClient.PUT('/units/live', data);
        this.handleResponse(response, onSuccess, onFail);
    }
}

const unitService = new UnitService();
export default unitService;
