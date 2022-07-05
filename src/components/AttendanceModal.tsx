import { Button, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';
import type { Moment } from 'moment';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { defaultFailureCallback } from '../service';
import service, { IEvent, ITable } from '../service/attendance';

interface ParticipantProps {
    visibleModal: boolean;
    selectedEvent: IEvent;
    loadingOk: boolean;
    handleOk: (e: React.MouseEvent<HTMLElement>) => void;
    handleCancel: (e: React.MouseEvent<HTMLElement>) => void;
}

interface MentorProps {
    visibleModal: boolean;
    selectedEvent: IEvent;
    loadingOk: boolean;
    handleOk: (e: React.MouseEvent<HTMLElement>) => void;
    handleCancel: (e: React.MouseEvent<HTMLElement>) => void;
    dataSource: ITable[];
    setDataSource: React.Dispatch<React.SetStateAction<ITable[]>>;
    selectedRowKeys: React.Key[];
    setSelectedRowKeys: (value: React.SetStateAction<React.Key[]>) => void;
}

export const ParticipantAttendanceModal = ({
    visibleModal,
    selectedEvent,
    loadingOk,
    handleOk,
    handleCancel,
}: ParticipantProps) => {
    const [attend, setAttend] = useState<Moment | null>(null);

    const loadModalFooter = () => {
        const footer = [
            <Button key="back" onClick={handleCancel}>
                Kembali
            </Button>,
        ];
        const currentDate = moment();

        if (
            selectedEvent.type === 'Self' &&
            currentDate.isBetween(
                selectedEvent.start_date,
                selectedEvent.end_date
            ) &&
            attend === null
        ) {
            footer.push(
                <Button
                    key="submit"
                    type="primary"
                    loading={loadingOk}
                    onClick={handleOk}
                >
                    Tandai Hadir
                </Button>
            );
        }

        return footer;
    };

    const timeFormat = 'DD MMM YY HH:mm';
    const startTime = `${moment(selectedEvent.start_date).format(timeFormat)}`
    const endTime = `${moment(selectedEvent.end_date).format(timeFormat)}`;

    const loadModalContent = () => {
        if (selectedEvent.type === 'Self') {
            if (attend === null) {
                if (moment().isBefore(selectedEvent.end_date)) {
                    return (
                        <p>
                            {`Presensi belum dibuka.`}
                        </p>
                    );
                } else {
                    return (
                        <p>
                            {`Yah! Kamu belum presensi dan presensi sudah ditutup sejak ${endTime}. `}
                        </p>
                    );
                }
            } else {
                return (
                    <p>
                        {`Anda sudah presensi pada ${attend.format(timeFormat)}.`}
                    </p>
                );
            }
        } else {
            if (attend === null) {
                return <p>Presensi untuk acara ini akan dilakukan oleh mentor.</p>;
            } else {
                return (
                    <p>
                        {`Mentor sudah melakukan presensi untuk anda pada ${attend.format(timeFormat)}.`}
                    </p>
                );
            }
        }
    };

    useEffect(() => {
        service.getSelfPresence(
            selectedEvent.id,
            (res) => {
                setAttend(res.attendance ? moment(res.attendance) : null);
            },
            (err) => defaultFailureCallback(err)
        );
    }, []);

    return (
        <Modal
            visible={visibleModal}
            title={selectedEvent.title}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={loadModalFooter()}
        >
            {loadModalContent()}
        </Modal>
    );
};

export const MentorAttendanceModal = ({
    visibleModal,
    selectedEvent,
    loadingOk,
    handleOk,
    handleCancel,
    dataSource,
    setDataSource,
    selectedRowKeys,
    setSelectedRowKeys,
}: MentorProps) => {
    const columns: ColumnsType<ITable> = [
        {
            title: 'NIM',
            dataIndex: 'nim',
        },
        {
            title: 'Nama',
            dataIndex: 'name',
        },
        {
            title: 'Kelompok',
            dataIndex: 'group',
        },
    ];

    const rowSelection: TableRowSelection<ITable> = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    useEffect(() => {
        service.getGroupPresence(
            selectedEvent.id,
            (res) => {
                setDataSource(res.result);
                setSelectedRowKeys(() => {
                    const newSelectedRowKeys: React.Key[] = res.result
                        .filter((element: any) => {
                            return element.status;
                        })
                        .map((element: any) => {
                            return element.key;
                        });

                    return newSelectedRowKeys;
                });
            },
            (err) => defaultFailureCallback(err)
        );
    }, []);

    const loadModalFooter = () => {
        const footer = [
            <Button key="back" onClick={handleCancel}>
                Kembali
            </Button>,
        ];
        if (selectedEvent.type === 'GroupLeader') {
            footer.push(
                <Button
                    key="submit"
                    type="primary"
                    loading={loadingOk}
                    onClick={handleOk}
                >
                    Simpan
                </Button>
            );
        }

        return footer;
    };

    const loadModalContent = () => {
        const timeFormat = 'DD MMM YY HH:mm';
        const startTime = `${moment(selectedEvent.start_date).format(timeFormat)}`
        const endTime = `${moment(selectedEvent.end_date).format(timeFormat)}`;
        const timeRange = `${startTime} - ${endTime}`;
        if (selectedEvent.type === 'GroupLeader') {
            return (
                <>
                    <p>
                        {`Waktu Presensi: ${timeRange}`}
                    </p>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={dataSource}
                    />
                </>
            );
        } else {
            return <p>Peserta akan melakukan presensi secara mandiri.</p>;
        }
    };

    return (
        <Modal
            visible={visibleModal}
            title={selectedEvent.title}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={loadModalFooter()}
        >
            {loadModalContent()}
        </Modal>
    );
};
