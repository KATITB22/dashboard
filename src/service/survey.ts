import APIClient from '../utils/api-client';
import { FailureCallbackFunction, GenericService, SuccessCallbackFunction } from ".";

class SurveyService extends GenericService {
    public async postSurvey(
        item: Record<string, any>,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.POST(`/insights`, {answer: item});
        this.handleResponse(response, onSuccess, onFail);
    }

    public async getSurvey(
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET(`/insights`);
        this.handleResponse(response, onSuccess, onFail);
    }
}

const service = new SurveyService();
export default service;