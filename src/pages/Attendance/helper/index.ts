import moment from 'moment';
import { IParticipantEvent } from '../../../service/attendance';

export const getType = (event: IParticipantEvent) => {
    const currentDate = moment();

    if (currentDate.isBetween(event.start_date, event.end_date)) {
        return 'success';
    } else {
        return 'error';
    }
};
