import moment from 'moment';
import { IEvent } from '../../../service/attendance';

export const getType = (event: IEvent) => {
    const currentDate = moment();

    if (currentDate.isBetween(event.start_date, event.end_date)) {
        return 'success';
    } else {
        return 'error';
    }
};
