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
    idx: number;
    title: string;
    attendance_start: string;
    attendance_end: string;
    attendance_type: string;
}

export interface REvent {
    title?: string;
    attendance_start?: string;
    attendance_end?: string;
    attendance_type?: string;
}

export interface ListEvent {
    events: IEvent[];
    page: number;
    pageCount: number;
    pageSize: number;
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
        pageNumber: number = 1,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
        
    ) {
        const response = await APIClient.GET(`/events`, {
            'pagination[pageSize]': 10,
            'pagination[page]': pageNumber,
        });
        if (response instanceof APIErrorObject) {
            if (!onFail) return;

            return onFail(response);
        }

        const rawEvents: any[] = response.data;
        const { page, pageCount, pageSize, total }: { [key: string]: number } =
            response.meta.pagination;
        const events: IEvent[] = rawEvents.map((eachRaw, eachIdx) => {
            const each: any = eachRaw.attributes;
            return {
                id: each.id,
                title: each.title,
                attendance_start: moment(each.attendance_start).format('DD MMM YY HH:mm:ss'),
                attendance_end: moment(each.attendance_end).format('DD MMM YY HH:mm:ss'),
                attendance_type: each.attendance_type,
                idx: eachIdx + 1 + (page - 1) * pageSize,
            };
        });
        const mappedResponse: ListEvent = {
            events,
            page,
            pageCount,
            total,
            pageSize,
        };
        if (onSuccess) onSuccess(mappedResponse);
    }
}

const eventService = new EventService();
export default eventService;
