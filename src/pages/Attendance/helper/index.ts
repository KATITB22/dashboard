import moment from "moment";
import { IParticipantEvent } from "../../../service/attendance";

export const getType = (event: IParticipantEvent) => {
    const currentDate = moment();
    const start = moment(event.start_date);
    const end = moment(event.end_date);
    if (currentDate.isBetween(start, end)) {
        return 'success';
    } else {
        return 'error';
    }
};