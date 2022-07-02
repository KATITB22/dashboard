import type { BadgeProps } from 'antd';
import { Alert, Badge, Button, Calendar, Modal, PageHeader, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';
import type { Moment } from 'moment';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';

interface EventResponse {
    name: string;
    startDate: Date;
    endDate: Date;
}

interface ParticipantResponse {
    key: React.Key;
    nim: string;
    name: string;
    group: string;
    isFilled: boolean;
}

const columns: ColumnsType<ParticipantResponse> = [
    {
        title: 'NIM',
        dataIndex: 'nim',
    },
    {
        title: 'Nama',
        dataIndex: 'name',
    },
    {
        title: 'Grup',
        dataIndex: 'group',
    },
];

const getEventData = (value: Moment) => {
    const eventData: EventResponse[] = [
        {
            name: 'KAT',
            startDate: new Date(),
            endDate: new Date(Date.now() + 1000 * 60),
        },
        {
            name: 'DikPus',
            startDate: new Date(Date.now() - 1000 * 60 * 60 * 25),
            endDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
        {
            name: 'OSKM',
            startDate: new Date(Date.now() + 1000 * 60 * 60 * 23),
            endDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
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

    if (currentDate < event.startDate) {
        return 'error';
    }
    if (currentDate >= event.startDate && currentDate <= event.endDate) {
        return 'warning';
    }
    return 'success';
};

const getParticipantResponse = (event: EventResponse | undefined) => {
    const participantData: ParticipantResponse[] = [];

    if (event?.name) {
        participantData.push(
            {
                key: '13520065',
                nim: '13520065',
                name: 'Kinan',
                group: 'A',
                isFilled: true,
            },
            {
                key: '13520101',
                nim: '13520101',
                name: 'Aira',
                group: 'A',
                isFilled: false,
            },
            {
                key: '13520056',
                nim: '13520056',
                name: 'Fikron',
                group: 'B',
                isFilled: true,
            }
        );
    }

    return participantData;
};

const getMonthData = (value: Moment) => value.month() === moment().month();

export const MentorAttendance = () => {
    const navigate = useNavigate();

    const [loadingOk, setLoadingOk] = useState(false);
    const [loadingModal, setLoadingModal] = useState<Map<string, boolean>>(
        new Map()
    );
    const [visibleModal, setVisibleModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventResponse>({
        name: '',
        startDate: new Date(),
        endDate: new Date(),
    });
    const [date, setDate] = useState(moment());
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const showModal = () => {
        setVisibleModal(true);
    };

    const handleOk = () => {
        setLoadingOk(true);
        setTimeout(() => {
            setVisibleModal(false);
            setLoadingOk(false);
            setSelectedRowKeys([]);
        }, 1000);
    };

    const handleCancel = () => {
        setVisibleModal(false);
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

            setSelectedRowKeys(() => {
                const participantData = getParticipantResponse(event);
                const newSelectedRowKeys: React.Key[] = participantData
                    .filter((participant) => participant.isFilled)
                    .map((participant) => participant.key);

                return newSelectedRowKeys;
            });

            showModal();
        }, 1000);
    };

    const monthCellRender = (newValue: Moment) => {
        const isAvailable = getMonthData(newValue);

        return isAvailable ? <h1>KAT</h1> : null;
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

    const onSelectParticipant = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<ParticipantResponse> = {
        selectedRowKeys,
        onChange: onSelectParticipant,
    };

    return (
        <StandardLayout>
            <PageHeader onBack={() => navigate(-1)} title="Group Attendance" />
            <Alert message={selectedRowKeys.toString()} />
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
                title={selectedEvent.name}
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
                    Start : {selectedEvent.startDate.toLocaleString('id-ID')}
                </h1>
                <h1>End : {selectedEvent.endDate.toLocaleString('id-ID')}</h1>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={getParticipantResponse(selectedEvent)}
                />
            </Modal>
        </StandardLayout>
    );
};
