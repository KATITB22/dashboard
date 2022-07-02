import { Button, Modal } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { defaultFailureCallback } from '../service';
import service, { IEvent } from '../service/attendance';

interface Props {
    visibleModal: boolean;
    selectedEvent: IEvent;
    loadingOk: boolean;
    handleOk: (e: React.MouseEvent<HTMLElement>) => void;
    handleCancel: (e: React.MouseEvent<HTMLElement>) => void;
}

export const AttendanceModal = ({
    visibleModal,
    selectedEvent,
    handleOk,
    handleCancel,
    loadingOk,
}: Props) => {
    const [attend, setAttend] = useState<Moment | null>(null);

    useEffect(() => {
        service.getSelfPresence(
            selectedEvent.id,
            (res) => {
                setAttend(res.attendance ? moment(res.attendance) : null);
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
