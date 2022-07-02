import type { BadgeProps } from 'antd';
import { Alert, Badge, Button, Calendar, PageHeader, Spin } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MentorAttendanceModal } from '../../components/AttendanceModal';
import { StandardLayout } from '../../layout/StandardLayout';
import { defaultFailureCallback } from '../../service';
import service, { IEvent, ITable } from '../../service/attendance';
import { getType } from './helper';

export const MentorAttendance = () => {
    const navigate = useNavigate();

    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingOkModalButton, setLoadingOkModalButton] = useState(false);
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
    const [dataSource, setDataSource] = useState<ITable[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const handleOkModalButton = () => {
        setLoadingOkModalButton(true);

        const attend: number[] = selectedRowKeys.map((key) =>
            parseInt(key.toString())
        );
        const notAttend: number[] = dataSource
            .map((element) => parseInt(element.key.toString()))
            .filter((key) => !attend.includes(key));

        console.log(attend, notAttend);

        service.groupAttendance(
            selectedEvent.id,
            attend,
            notAttend,
            () => {
                setVisibleModal(false);
                setLoadingOkModalButton(false);
                setSelectedRowKeys([]);
            },
            (err) => {
                defaultFailureCallback(err);
                setLoadingOkModalButton(false);
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
                    title="Group Attendance"
                />
                <Alert message={selectedRowKeys.toString()} />
                <Calendar
                    value={date}
                    onSelect={onSelectCell}
                    onPanelChange={onPanelChange}
                    disabledDate={disableDate}
                    dateCellRender={dateCellRender}
                />
                {visibleModal && (
                    <MentorAttendanceModal
                        visibleModal={visibleModal}
                        selectedEvent={selectedEvent}
                        handleOk={handleOkModalButton}
                        loadingOk={loadingOkModalButton}
                        handleCancel={() => {
                            setVisibleModal(false);
                        }}
                        dataSource={dataSource}
                        setDataSource={setDataSource}
                        selectedRowKeys={selectedRowKeys}
                        setSelectedRowKeys={setSelectedRowKeys}
                    />
                )}
            </Spin>
        </StandardLayout>
    );
};
