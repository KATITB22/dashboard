import moment from 'moment';
import {
    FailureCallbackFunction,
    GenericService,
    SuccessCallbackFunction,
} from '.';
import APIClient from '../utils/api-client';
import { APIErrorObject } from '../utils/api-error-object';

export interface ITopic {
    id: string;
    idx: number;
    title: string;
    start: string;
    end: string;
}

export interface RTopic {
    title: string;
    start: string;
    end: string;
    score_released?: boolean;
}

export interface ListTopic {
    topics: ITopic[];
    page: number;
    pageCount: number;
    pageSize: number;
}

class AssignmentsService extends GenericService {
    public async createTopic(
        item: RTopic,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.POST('/topics', item);
        this.handleResponse(response, onSuccess, onFail);
    }

    public async updateTopic(
        id: string,
        item: RTopic,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.PUT(`/topics/${id}`, item);
        this.handleResponse(response, onSuccess, onFail);
    }

    public async deleteTopic(
        id: string,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.DELETE(`/topics/${id}`);
        this.handleResponse(response, onSuccess, onFail);
    }

    public async getTopics(
        pageNumber: number = 1,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET(`/topics`, {
            'pagination[pageSize]': 10,
            'pagination[page]': pageNumber,
        });
        if (response instanceof APIErrorObject) {
            if (!onFail) return;

            return onFail(response);
        }

        const rawTopics: any[] = response.data;
        const { page, pageCount, pageSize }: { [key: string]: number } =
            response.meta.pagination;
        const topics: ITopic[] = rawTopics.map((eachRaw, eachIdx) => {
            const each: any = eachRaw.attributes;
            return {
                id: each.id,
                title: each.title,
                start: moment(each.start).format('DD MMM YY HH:MM:SS'),
                end: moment(each.end).format('DD MMM YY HH:MM:SS'),
                idx: eachIdx + 1 + (page - 1) * pageSize,
            };
        });
        const mappedResponse: ListTopic = {
            topics,
            page,
            pageCount,
            pageSize,
        };
        if (onSuccess) onSuccess(mappedResponse);
    }
}

const service = new AssignmentsService();
export default service;
