import {
    FailureCallbackFunction,
    GenericService,
    SuccessCallbackFunction,
} from '.';
import APIClient from '../utils/api-client';
import { APIErrorObject } from '../utils/api-error-object';

export interface IParticipantEvent {
    id: string;
    title: string;
    start_date: Date;
    end_date: Date;
    type: string;
    is_filled: boolean;
}

export interface IMentorEvent {
    id: string;
    title: string;
    start_date: Date;
    end_date: Date;
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
            `/attendance/self/${eventId}`,
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
        const response = await APIClient.POST(`/attendance/group/${eventId}`, {
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

    public async getSelfEvents(
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET('/events/minified');

        if (response instanceof APIErrorObject) {
            if (!onFail) return;

            return onFail(response);
        }

        const rawEvents: any[] = response.data;
        const participantEvents: IParticipantEvent[] = rawEvents.map(
            (eachRaw) => {
                return {
                    id: eachRaw.id,
                    title: eachRaw.title,
                    start_date: new Date(eachRaw.start),
                    end_date: new Date(eachRaw.end),
                    type: eachRaw.title,
                    is_filled: false,
                };
            }
        );

        if (onSuccess) {
            onSuccess(participantEvents);
        }
    }

    public async getGroupEvents(
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET('/events/minified');

        if (response instanceof APIErrorObject) {
            if (!onFail) return;

            return onFail(response);
        }

        const rawEvents: any[] = response.data;
        const mentorEvents: IMentorEvent[] = rawEvents.map((eachRaw) => {
            const each: any = eachRaw.attributes;
            return {
                id: each.id,
                title: each.title,
                start_date: new Date(each.start),
                end_date: new Date(each.end),
                type: each.title,
            };
        });

        if (onSuccess) {
            onSuccess(mentorEvents);
        }
    }
}

const service = new AttendanceService();
export default service;
