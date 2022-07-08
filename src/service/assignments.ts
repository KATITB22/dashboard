import moment from 'moment';
import {
    FailureCallbackFunction,
    GenericService,
    SuccessCallbackFunction,
} from '.';
import APIClient from '../utils/api-client';
import { APIErrorObject } from '../utils/api-error-object';
import { Question } from './questions';

export interface ITopic {
    id: string;
    title: string;
    start: string;
    end: string;
}

export interface RTopic {
    title: string;
    start: string;
    end: string;
    score_released?: boolean;
    questions?: Question[];
}

export interface ListTopic {
    topics: ITopic[];
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
}

class AssignmentsService extends GenericService {
    public async findOrGetEntry(topicId: string,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction) {
        const response = await APIClient.POST(`/entries/${topicId}`);
        if (response.topic && response.topic.questions && Array.isArray(response.topic.questions)) {
            const questions: any[] = response.topic.questions;
            questions.sort((a, b) => a.question_no - b.question_no);
            const final: Question[] = questions.map((each: any): Question => {
                const result = ({
                    question_no: each.question_no,
                    score: each.score,
                    metadata: {
                        ...each.metadata,
                    },
                    question: each.content,
                    hidden_metadata: {},
                    id: each.id
                });
                if (each.private_metadata) {
                    result.hidden_metadata = {
                        ...each.private_metadata
                    }
                }
                return result;
            })
            response.topic.questions = final;
        } else if (response.topic) {
            response.topic.questions = [];
        }
        this.handleResponse(response, onSuccess, onFail);
    }

    public async getTopic(
        id: string,
        isComplete: boolean,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET(`/topics/${id}${(isComplete) ? '/complete' : ''}`);
        if (response.questions && Array.isArray(response.questions)) {
            const questions: any[] = response.questions;
            const final: Question[] = questions.map((each: any): Question => {
                const result = ({
                    question_no: each.question_no,
                    score: each.score,
                    metadata: {
                        ...each.metadata,
                    },
                    question: each.content,
                    hidden_metadata: {},
                    id: each.id
                });
                if (each.private_metadata) {
                    result.hidden_metadata = {
                        ...each.private_metadata
                    }
                }
                return result;
            })
            response.questions = final;
        }
        this.handleResponse(response, onSuccess, onFail);
    }

    public async createTopic(
        item: RTopic,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.POST('/topics', item);
        this.handleResponse(response, onSuccess, onFail);
    }

    public async getEntry(
        entryId: string,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET(`/entries/${entryId}/entry`);
        this.handleResponse(response, onSuccess, onFail);
    }

    public async postAnswers(
        entryId: string,
        item: Record<string, any>,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.PUT(`/entries/${entryId}/answer`, {
            answers: item
        });
        this.handleResponse(response, onSuccess, onFail);
    }

    public async postScores(
        entryId: string,
        item: Record<string, any>,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.PUT(`/entries/${entryId}/score`, {
            scores: item
        });
        this.handleResponse(response, onSuccess, onFail);
    }

    public async submit(
        entryId: string,
        item: Record<string, any>,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.POST(`/entries/${entryId}/submit`, {
            answers: item
        });
        this.handleResponse(response, onSuccess, onFail);
    }

    public async unsubmit(
        entryId: string,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.POST(`/entries/${entryId}/edit`, {});
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


    public async getTopicSubmissionsMyGroup(
        topicId: string,
        pageNumber: number = 1,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET(`/entries/${topicId}/group`, {
            'pageSize': 10,
            'page': pageNumber

        });
        if (response instanceof APIErrorObject) {
            if (!onFail) return;

            return onFail(response);
        }

        const rawEntries: any[] = response.data;
        const { page, pageCount, pageSize, total }: { [key: string]: number } = response.metadata;
        const mappedResponse = {
            entries: rawEntries,
            page,
            pageCount,
            total,
            pageSize: +pageSize,
        };
        if (onSuccess) onSuccess(mappedResponse);
    }

    public async getTopicSubmissions(
        topicId: string,
        pageNumber: number = 1,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET(`/entries/${topicId}`, {
            'pageSize': 10,
            'page': pageNumber

        });
        if (response instanceof APIErrorObject) {
            if (!onFail) return;

            return onFail(response);
        }

        const rawEntries: any[] = response.data;
        const { page, pageCount, pageSize, total }: { [key: string]: number } = response.metadata;
        const mappedResponse = {
            entries: rawEntries,
            page,
            pageCount,
            total,
            pageSize: +pageSize,
        };
        if (onSuccess) onSuccess(mappedResponse);
    }

    public async getTopics(
        pageNumber: number = 1,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET(`/topics`, {
            'pagination[pageSize]': 10,
            'pagination[page]': pageNumber,
            'sort[0]': 'start:desc',
            'sort[1]': 'end:desc'

        });
        if (response instanceof APIErrorObject) {
            if (!onFail) return;

            return onFail(response);
        }

        const rawTopics: any[] = response.data;
        const { page, pageCount, pageSize, total }: { [key: string]: number } =
            response.meta.pagination;
        const topics: ITopic[] = rawTopics.map((eachRaw, eachIdx) => {
            const each: any = eachRaw.attributes;
            return {
                id: each.id,
                title: each.title,
                start: moment(each.start).format('DD MMM YY HH:mm'),
                end: moment(each.end).format('DD MMM YY HH:mm'),
            };
        });
        const mappedResponse: ListTopic = {
            topics,
            page,
            pageCount,
            total,
            pageSize,
        };
        if (onSuccess) onSuccess(mappedResponse);
    }
}

const service = new AssignmentsService();
export default service;
