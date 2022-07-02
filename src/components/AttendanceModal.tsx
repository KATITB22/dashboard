import { Button, Modal } from "antd"
import moment from "moment";
import { useEffect, useState } from "react";
import { defaultFailureCallback } from "../service";
import Service, { IParticipantEvent } from "../service/attendance";

interface Props {
    visibleModal: boolean;
    selectedEvent: IParticipantEvent;
    loadingOk: boolean;
    handleOk: (e: React.MouseEvent<HTMLElement>) => void;
    handleCancel: (e: React.MouseEvent<HTMLElement>) => void;
}

export const AttendanceModal = ({ visibleModal, selectedEvent, handleOk, handleCancel, loadingOk }: Props) => {
    const [attend, setAttend] = useState<string | null>(null);
    useEffect(() => {
        Service.getSelfPresence(selectedEvent.id, (result) => {
            console.log(result);
            setAttend(result.attendance);
        }, (err) => defaultFailureCallback(err))
    }, []);

    const footer = [
        <Button key="back" onClick={handleCancel}>
            Kembali
        </Button>,
    ];

    console.log(selectedEvent);
    if (selectedEvent.type == 'Self' && attend === null) {
        footer.push(
            <Button
                key="submit"
                type="primary"
                loading={loadingOk}
                onClick={handleOk}
            >
                Tandai Hadir
            </Button>);
    }
    return (
        <Modal
            visible={visibleModal}
            title={selectedEvent.title}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={footer}
        >
            <p>{`${moment(selectedEvent.start_date).format("DD MMM YY HH:mm:ss")} - ${moment(selectedEvent.end_date).format("DD MMM YY HH:mm:ss")}`}</p>
        </Modal>)
}