import { Button, Modal } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { SelfProps } from ".";
import { defaultFailureCallback } from '../../service';
import service from '../../service/attendance';

export const MentorAttendanceModal = ({
    visibleModal,
    selectedEvent,
    loadingOk,
    handleOk,
    handleCancel,
}: SelfProps) => {
    const [attend, setAttend] = useState<Moment | null>(null);

    const loadModalFooter = () => {
        const footer = [
            <Button key="back" onClick={handleCancel}>
                Kembali
            </Button>,
        ];
        const currentDate = moment();

        if (
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
    const endTime = `${moment(selectedEvent.end_date).format(timeFormat)}`;

    const loadModalContent = () => {
        if (attend === null) {
            if (moment().isBefore(selectedEvent.start_date)) {
                return (
                    <p>
                        {`Presensi belum dibuka.`}
                    </p>
                );
            } if (moment().isBefore(selectedEvent.end_date)) {
                return (
                    <p>
                        {`Presensi dibuka sampai ${endTime}.`}
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
}