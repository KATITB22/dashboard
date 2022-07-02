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

    const loadModalContent = () => {
        if (selectedEvent.type === 'Self') {
            if (attend === null) {
                return (
                    <p>
                        {`${moment(selectedEvent.start_date).format(
                            'DD MMM YY HH:mm:ss'
                        )} - ${moment(selectedEvent.end_date).format(
                            'DD MMM YY HH:mm:ss'
                        )}`}
                    </p>
                );
            } else {
                return (
                    <p>
                        {`Anda sudah absen pada: ${attend.format(
                            'DD MMM YY HH:mm:ss'
                        )}`}
                    </p>
                );
            }
        } else {
            return <p>Akan diabsenkan oleh mentor!</p>;
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
    selectedRowKeys,
    setSelectedRowKeys,
}: MentorProps) => {
    const [dataSource, setDataSource] = useState<ITable[]>([]);

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
            title: 'Grup',
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

    return (
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
                Start : {selectedEvent.start_date.format('DD MMM YY HH:mm:ss')}
            </h1>
            <h1>End : {selectedEvent.end_date.format('DD MMM YY HH:mm:ss')}</h1>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataSource}
            />
        </Modal>
    );
};
