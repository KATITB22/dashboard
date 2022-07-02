import type { BadgeProps } from 'antd';
import { Badge, Button, Calendar, PageHeader, Spin } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AttendanceModal } from '../../components/AttendanceModal';
import { StandardLayout } from '../../layout/StandardLayout';
import { defaultFailureCallback } from '../../service';
import service, { IEvent } from '../../service/attendance';
import { getType } from './helper';

export const ParticipantAttendance = () => {
    const navigate = useNavigate();

    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingOkModalButton, setLoadingOk] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [eventList, setEventList] = useState<IEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<IEvent>({
        id: '',
        title: '',
        start_date: moment(),
        end_date: moment(),
        type: '',
    });
    const [date, setDate] = useState(moment());
    const [selectedDate, setSelectedDate] = useState(moment());

    const handleOkModalButton = () => {
        setLoadingOk(true);

        service.selfAttendance(
            selectedEvent.id,
            () => {
                setVisibleModal(false);
                setLoadingOk(false);
            },
            (err) => {
                defaultFailureCallback(err);
            }
        );
    };

    const handleEventClick = (event: IEvent) => {
        setSelectedEvent(event);
        setVisibleModal(true);
    };

    const dateCellRender = (newValue: Moment) => {
        const eventData = eventList.filter((event) =>
            event.start_date.isSame(newValue, 'date')
        );

        return (
            <ul>
                {eventData.map((event) => (
                    <li key={event.id}>
                        <Button
                            type="primary"
                            onClick={() => {
                                handleEventClick(event);
                            }}
                        >
                            <Badge
                                status={getType(event) as BadgeProps['status']}
                                text={event.title}
                            />
                        </Button>
                    </li>
                ))}
            </ul>
        );
    };

    const onSelectCell = (newDate: Moment) => {
        setDate(newDate);
        setSelectedDate(newDate);
    };

    const onPanelChange = (newDate: Moment) => {
        setDate(newDate);
    };

    const disableDate = (newDate: Moment) =>
        !newDate.isSame(selectedDate, 'month');

    useEffect(() => {
        setLoadingPage(true);
        service.getEvents(
            (res) => {
                setEventList(res.result);
                setLoadingPage(false);
            },
            (err) => {
                defaultFailureCallback(err);
                setLoadingPage(false);
            }
        );
    }, []);

    return (
        <StandardLayout>
            <Spin tip="Loading..." spinning={loadingPage}>
                <PageHeader
                    onBack={() => navigate(-1)}
                    title="Participant Attendance"
                />
                <Calendar
                    value={date}
                    onSelect={onSelectCell}
                    onPanelChange={onPanelChange}
                    disabledDate={disableDate}
                    dateCellRender={dateCellRender}
                />
                {visibleModal && (
                    <AttendanceModal
                        visibleModal={visibleModal}
                        selectedEvent={selectedEvent}
                        handleOk={handleOkModalButton}
                        loadingOk={loadingOkModalButton}
                        handleCancel={() => {
                            setVisibleModal(false);
                        }}
                    />
                )}
            </Spin>
        </StandardLayout>
    );
};
