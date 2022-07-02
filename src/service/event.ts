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
    start: string;
    end: string;
}

export interface REvent {
    title?: string;
    attendance_start?: string;
    attendance_end?: string;
    attendance_type?: string;
}

export interface ListEvent {
    events: IEvent[];
    total: number;
}

class EventService extends GenericService {
    public async createEvent(
        item: REvent,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.POST('/events', item);
        this.handleResponse(response, onSuccess, onFail);
    }

    public async updateEvent(
        id: string,
        item: REvent,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.PUT(`/events/${id}`, item);
        this.handleResponse(response, onSuccess, onFail);
    }

    public async deleteEvent(
        id: string,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.DELETE(`/events/${id}`);
        this.handleResponse(response, onSuccess, onFail);
    }

    public async getEventById(
        id: string,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET(`/events/${id}`);
        const result = {
            title: response.title,
            attendance_start: moment(response.attendance_start).format(
                'DD MMM YY HH:mm:ss'
            ),
            attendance_end: moment(response.attendance_end).format(
                'DD MMM YY HH:mm:ss'
            ),
            attendance_type: response.attendance_type,
        };
        this.handleResponse(result, onSuccess, onFail);
    }

    public async getEvents(
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
        
    ) {
        const response = await APIClient.GET(`/events`, {
        });
        if (response instanceof APIErrorObject) {
            if (!onFail) return;
            return onFail(response);
        }
        const events: IEvent[] = response.data;
        events.forEach((eachRaw, _) => {
            const each: any = eachRaw.attributes;
            eachRaw.id = each.id;
            eachRaw.start = moment(each.attendance_start).format('DD MMM YY HH:mm:ss');
            eachRaw.end = moment(each.attendance_end).format('DD MMM YY HH:mm:ss');
            eachRaw.title = each.title;

        });
        const total = events.length;
        const mappedResponse: ListEvent = {
            events,
            total
        };
        if (onSuccess) onSuccess(mappedResponse);
    }
}

const eventService = new EventService();
export default eventService;
