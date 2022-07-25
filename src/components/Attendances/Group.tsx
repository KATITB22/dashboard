import { Button, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';
import moment from 'moment';
import { useEffect } from 'react';
import { MentorProps } from '.';
import { defaultFailureCallback } from '../../service';
import service, { ITable } from '../../service/attendance';


export const GroupAttendanceModal = ({
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