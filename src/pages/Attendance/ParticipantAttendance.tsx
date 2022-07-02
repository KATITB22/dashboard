import type { BadgeProps } from 'antd';
import { Badge, Button, Calendar, Modal, PageHeader, Spin } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import { defaultFailureCallback } from '../../service';
import service, { IParticipantEvent } from '../../service/attendance';

export const ParticipantAttendance = () => {
    const navigate = useNavigate();

    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingOk, setLoadingOk] = useState(false);
    const [loadingModal, setLoadingModal] = useState<Map<string, boolean>>(
        new Map()
    );
    const [visibleModal, setVisibleModal] = useState(false);
    const [eventList, setEventList] = useState<IParticipantEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<IParticipantEvent>({
        id: '',
        title: '',
        start_date: new Date(),
        end_date: new Date(),
        type: '',
        is_filled: false,
    });
    const [date, setDate] = useState(moment());
    const [selectedDate, setSelectedDate] = useState(moment());

    const getEventData = (value: Moment) => {
        const filteredEventData: IParticipantEvent[] = eventList.filter(
            (event) =>
                event.start_date.getDate() === value.date() &&
                event.start_date.getMonth() === value.month() &&
                event.start_date.getFullYear() === value.year()
        );

        return filteredEventData;
    };

    const getType = (event: IParticipantEvent) => {
        const currentDate = new Date();

        if (event.is_filled) {
            return 'success';
        }
        if (currentDate >= event.start_date && currentDate <= event.end_date) {
            return 'warning';
        }
        return 'error';
    };

    const getMonthData = (value: Moment) => value.month() === moment().month();

    const showModal = () => {
        setVisibleModal(true);
    };

    const handleOk = () => {
        setLoadingOk(true);
        setTimeout(() => {
            setVisibleModal(false);
            setLoadingOk(false);
        }, 1000);
    };

    const handleCancel = () => {
        setVisibleModal(false);
    };

    const handleClick = (event: IParticipantEvent) => {
        setSelectedEvent(event);
        setLoadingModal((prevLoadingModal) => {
            const newLoadingModal = new Map(prevLoadingModal);
            newLoadingModal.set(event.id, true);

            return newLoadingModal;
        });

        setTimeout(() => {
            setLoadingModal((prevLoadingModal) => {
                const newLoadingModal = new Map(prevLoadingModal);
                newLoadingModal.set(event.id, false);

                return newLoadingModal;
            });
            showModal();
        }, 1000);
    };

    const monthCellRender = (newValue: Moment) => {
        const isAvailable = getMonthData(newValue);

        return isAvailable ? <h1>Dikpus/KAT</h1> : null;
    };

    const disableButton = (event: IParticipantEvent) => {
        const currentDate = new Date();

        return (
            currentDate < event.start_date ||
            currentDate > event.end_date ||
            event.is_filled
        );
    };

    const dateCellRender = (newValue: Moment) => {
        const eventData = getEventData(newValue);

        return (
            <ul>
                {eventData.map((event) => (
                    <li key={event.id}>
                        <Button
                            type="primary"
                            loading={loadingModal.get(event.id)}
                            onClick={() => {
                                handleClick(event);
                            }}
                            disabled={disableButton(event)}
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
        service
            .getSelfEvents(
                (res) => {
                    setEventList(() => {
                        const newEventList: IParticipantEvent[] = [];
                        res.forEach((element: any) => {
                            service.getSelfPresence(
                                element.id,
                                (res) => {
                                    newEventList.push({
                                        id: element.id,
                                        title: element.title,
                                        start_date: element.start_date,
                                        end_date: element.end_date,
                                        type: element.type,
                                        is_filled: res.status,
                                    });
                                },

                                (err) => {
                                    defaultFailureCallback(err);
                                }
                            );
                        });

                        return newEventList;
                    });
                },
                (err) => {
                    defaultFailureCallback(err);
                }
            )
            .then(() => setLoadingPage(false));
    }, []);

    return (
        <StandardLayout>
            {loadingPage ? (
                <Spin tip="Loading..." />
            ) : (
                <>
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
                        monthCellRender={monthCellRender}
                    />
                    <Modal
                        visible={visibleModal}
                        title={selectedEvent.title}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Kembali
                            </Button>,
                            <Button
                                key="submit"
                                type="primary"
                                loading={loadingOk}
                                onClick={handleOk}
                            >
                                Tandai Hadir
                            </Button>,
                        ]}
                    >
                        <h1>
                            Start :{' '}
                            {selectedEvent.start_date.toLocaleString('id-ID')}
                        </h1>
                        <h1>
                            End :{' '}
                            {selectedEvent.end_date.toLocaleString('id-ID')}
                        </h1>
                    </Modal>
                </>
            )}
        </StandardLayout>
    );
};
