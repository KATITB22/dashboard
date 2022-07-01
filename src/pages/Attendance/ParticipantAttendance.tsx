import type { BadgeProps } from 'antd';
import { Badge, Button, Calendar, Modal, PageHeader } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';

interface EventResponse {
    name: string;
    startDate: Date;
    endDate: Date;
    isFilled: boolean;
}

const getEventData = (value: Moment) => {
    const eventData: EventResponse[] = [
        {
            name: 'KAT',
            startDate: new Date(),
            endDate: new Date(Date.now() + 1000 * 60),
            isFilled: true,
        },
        {
            name: 'DikPus',
            startDate: new Date(Date.now() - 1000 * 60 * 60 * 25),
            endDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
            isFilled: true,
        },
        {
            name: 'OSKM',
            startDate: new Date(Date.now() + 1000 * 60 * 60 * 23),
            endDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
            isFilled: false,
        },
    ];

    const filteredEventData: EventResponse[] = eventData.filter(
        (event) =>
            event.startDate.getDate() === value.date() &&
            event.startDate.getMonth() === value.month() &&
            event.startDate.getFullYear() === value.year()
    );

    return filteredEventData;
};

const getType = (event: EventResponse) => {
    const currentDate = new Date();

    if (event.isFilled) {
        return 'success';
    }
    if (currentDate >= event.startDate && currentDate <= event.endDate) {
        return 'warning';
    }
    return 'error';
};

const getMonthData = (value: Moment) => value.month() === moment().month();

export const ParticipantAttendance = () => {
    const navigate = useNavigate();

    const [loadingOk, setLoadingOk] = useState(false);
    const [loadingModal, setLoadingModal] = useState<Map<string, boolean>>(
        new Map()
    );
    const [visibleModal, setVisibleModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<
        EventResponse | undefined
    >(undefined);
    const [date, setDate] = useState(moment());
    const [selectedDate, setSelectedDate] = useState(moment());

    const showModal = () => {
        setVisibleModal(true);
    };

    const handleOk = () => {
        setLoadingOk(true);
        setTimeout(() => {
            setVisibleModal(false);
            setLoadingOk(false);
            setSelectedEvent(undefined);
        }, 1000);
    };

    const handleCancel = () => {
        setVisibleModal(false);
        setSelectedEvent(undefined);
    };

    const handleClick = (event: EventResponse) => {
        setSelectedEvent(event);
        setLoadingModal((prevLoadingModal) => {
            const newLoadingModal = new Map(prevLoadingModal);
            newLoadingModal.set(event.name, true);

            return newLoadingModal;
        });

        setTimeout(() => {
            setLoadingModal((prevLoadingModal) => {
                const newLoadingModal = new Map(prevLoadingModal);
                newLoadingModal.set(event.name, false);

                return newLoadingModal;
            });
            showModal();
        }, 1000);
    };

    const monthCellRender = (newValue: Moment) => {
        const isAvailable = getMonthData(newValue);

        return isAvailable ? <h1>Dikpus/KAT</h1> : null;
    };

    const disableButton = (participant: EventResponse) => {
        const currentDate = new Date();

        return (
            currentDate < participant.startDate ||
            currentDate > participant.endDate ||
            participant.isFilled
        );
    };

    const dateCellRender = (newValue: Moment) => {
        const eventData = getEventData(newValue);

        return (
            <ul>
                {eventData.map((event) => (
                    <li key={event.name}>
                        <Button
                            type="primary"
                            loading={loadingModal.get(event.name)}
                            onClick={() => {
                                handleClick(event);
                            }}
                            disabled={disableButton(event)}
                            block
                        >
                            <Badge
                                status={getType(event) as BadgeProps['status']}
                                text={event.name}
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

    return (
        <StandardLayout>
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
                title={selectedEvent?.name}
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
                    Start : {selectedEvent?.startDate.toLocaleString('id-ID')}
                </h1>
                <h1>End : {selectedEvent?.endDate.toLocaleString('id-ID')}</h1>
            </Modal>
        </StandardLayout>
    );
};
