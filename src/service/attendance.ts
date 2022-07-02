import type { Moment } from 'moment';
import moment from 'moment';
import {
    FailureCallbackFunction,
    GenericService,
    SuccessCallbackFunction,
} from '.';
import APIClient from '../utils/api-client';
import { APIErrorObject } from '../utils/api-error-object';

export interface IEvent {
    id: string;
    title: string;
    start_date: Moment;
    end_date: Moment;
    type: string;
}

export interface REvent {
    id: string;
    title: string;
    start: string;
    end: string;
    type: string;
}

class AttendanceService extends GenericService {
    public async selfAttendance(
        eventId: string,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.POST(
            `/attendances/self/${eventId}`,
            {}
        );
        this.handleResponse(response, onSuccess, onFail);
    }

    public async groupAttendance(
        eventId: string,
        attend: string[],
        notAttend: string[],
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.POST(`/attendances/group/${eventId}`, {
            attend,
            not_attend: notAttend,
        });
        this.handleResponse(response, onSuccess, onFail);
    }

    public async getSelfPresence(
        eventId: string,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET(`/attendances/self/${eventId}`);
        this.handleResponse(response, onSuccess, onFail);
    }

    public async getGroupPresence(
        eventId: string,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET(`/attendances/group/${eventId}`);
        this.handleResponse(response, onSuccess, onFail);
    }

    public async getEvents(
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET('/events/minified');

        if (response instanceof APIErrorObject) {
            if (!onFail) return;

            return onFail(response);
        }

        const rawEvents: any[] = response.data;
        const participantEvents: IEvent[] = rawEvents.map((eachRaw) => {
            return {
                id: eachRaw.id,
                title: eachRaw.title,
                start_date: moment(eachRaw.start),
                end_date: moment(eachRaw.end),
                type: eachRaw.type,
            };
        });

        if (onSuccess) {
            onSuccess({ result: participantEvents });
        }
    }
}

const service = new AttendanceService();
export default service;
