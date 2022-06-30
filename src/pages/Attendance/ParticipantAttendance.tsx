import type { BadgeProps } from 'antd';
import { Alert, Badge, Calendar, PageHeader } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';

interface AttendanceData {
    type: string;
    content: string;
}

const getListData = (value: Moment) => {
    let listData: AttendanceData[] = [];

    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'Event 1' },
                { type: 'success', content: 'Event 2' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'Event 3' },
                { type: 'success', content: 'Event 4' },
                { type: 'error', content: 'Event 5' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'Event 6' },
                { type: 'success', content: 'Event 7' },
                { type: 'error', content: 'Event 8' },
                { type: 'error', content: 'Event 9' },
                { type: 'error', content: 'Event 10' },
                { type: 'error', content: 'Event 11' },
            ];
            break;
        default:
    }

    return listData;
};

const getMonthData = (value: Moment) => value.month() === moment().month();

export const ParticipantAttendance = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState(moment());
    const [selectedValue, setSelectedValue] = useState(moment());

    const onSelect = (newValue: Moment) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue: Moment) => {
        setValue(newValue);
    };

    const monthCellRender = (newValue: Moment) => {
        const isAvailable = getMonthData(newValue);

        return isAvailable ? (
            <text className="font-bold justify-center text-lg">KAT</text>
        ) : null;
    };

    const dateCellRender = (newValue: Moment) => {
        const listData = getListData(newValue);

        return (
            <ul>
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge
                            status={item.type as BadgeProps['status']}
                            text={item.content}
                        />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <StandardLayout>
            <PageHeader
                onBack={() => navigate(-1)}
                title="Participant Attendance"
            />
            <Alert
                message={`You selected date: ${selectedValue?.format(
                    'YYYY-MM-DD'
                )}`}
            />
            <Calendar
                value={value}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
            />
        </StandardLayout>
    );
};
