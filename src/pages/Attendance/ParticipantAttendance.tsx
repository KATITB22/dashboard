import type { BadgeProps } from 'antd';
import { Badge, Button, Calendar, PageHeader, Modal } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';

interface GetParticipantResponse {
    eventName: string;
    eventStartDate: Date;
    eventEndDate: Date;
    isFilled: boolean;
}

const getParticipantData = (value: Moment) => {
    const participantData: GetParticipantResponse[] = [
        {
            eventName: 'Djakarta Warehouse Project',
            eventStartDate: new Date(),
            eventEndDate: new Date(Date.now() + 1000 * 60),
            isFilled: false,
        },
        {
            eventName: 'Bandoeng Warehouse Project',
            eventStartDate: new Date(Date.now() - 1000 * 60 * 60 * 25),
            eventEndDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
            isFilled: false,
        },
        {
            eventName: 'Tangerang Warehouse Project',
            eventStartDate: new Date(Date.now() + 1000 * 60 * 60 * 23),
            eventEndDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
            isFilled: false,
        },
    ];

    const filteredParticipantData: GetParticipantResponse[] =
        participantData.filter(
            (participant) =>
                participant.eventStartDate.getDate() === value.date() &&
                participant.eventStartDate.getMonth() === value.month() &&
                participant.eventStartDate.getFullYear() === value.year()
        );

    return filteredParticipantData;
};

const getType = (participant: GetParticipantResponse) => {
    const currentDate = new Date();

    if (participant.isFilled) {
        return 'success';
    }
    if (
        currentDate >= participant.eventStartDate &&
        currentDate <= participant.eventEndDate
    ) {
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
    const [selectedParticipant, setSelectedParticipant] = useState<
        GetParticipantResponse | undefined
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
            setSelectedParticipant(undefined);
        }, 1000);
    };

    const handleCancel = () => {
        setVisibleModal(false);
        setSelectedParticipant(undefined);
    };

    const handleClick = (participant: GetParticipantResponse) => {
        setSelectedParticipant(participant);
        setLoadingModal((prevLoadingModal) => {
            const newLoadingModal = new Map(prevLoadingModal);
            newLoadingModal.set(participant.eventName, true);

            return newLoadingModal;
        });

        setTimeout(() => {
            setLoadingModal((prevLoadingModal) => {
                const newLoadingModal = new Map(prevLoadingModal);
                newLoadingModal.set(participant.eventName, false);

                return newLoadingModal;
            });
            showModal();
        }, 1000);
    };

    const monthCellRender = (newValue: Moment) => {
        const isAvailable = getMonthData(newValue);

        return isAvailable ? <h1>Dikpus/KAT</h1> : null;
    };

    const dateCellRender = (newValue: Moment) => {
        const participantData = getParticipantData(newValue);

        return (
            <ul>
                {participantData.map((participant) => (
                    <li key={participant.eventName}>
                        <Button
                            type="primary"
                            loading={loadingModal.get(participant.eventName)}
                            onClick={() => {
                                handleClick(participant);
                            }}
                            block
                        >
                            <Badge
                                status={
                                    getType(participant) as BadgeProps['status']
                                }
                                text={participant.eventName}
                            />
                        </Button>
                    </li>
                ))}
            </ul>
        );
    };

    const onSelect = (newDate: Moment) => {
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
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                disabledDate={disableDate}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
            />
            <Modal
                visible={visibleModal}
                title="Absensi"
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
                <h1>Nama : {selectedParticipant?.eventName}</h1>
                <h1>
                    Start : {selectedParticipant?.eventStartDate.toString()}
                </h1>
                <h1>End : {selectedParticipant?.eventEndDate.toString()}</h1>
            </Modal>
        </StandardLayout>
    );
};
