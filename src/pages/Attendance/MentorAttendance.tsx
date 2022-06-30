import type { BadgeProps } from 'antd';
import { Alert, Badge, Button, Calendar, PageHeader, Modal } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';

interface AttendanceData {
    type: string;
    content: string;
}

const getListData = (value: Moment) => {
    let listData: AttendanceData[] = [];

    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'Event 1' },
                { type: 'success', content: 'Event 2' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'Event 3' },
                { type: 'success', content: 'Event 4' },
                { type: 'error', content: 'Event 5' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'Event 6' },
                { type: 'success', content: 'Event 7' },
                { type: 'error', content: 'Event 8' },
                { type: 'error', content: 'Event 9' },
                { type: 'error', content: 'Event 10' },
                { type: 'error', content: 'Event 11' },
            ];
            break;
        default:
    }

    return listData;
};

const getMonthData = (value: Moment) => value.month() === moment().month();

export const MentorAttendance = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(moment());
    const [selectedValue, setSelectedValue] = useState(moment());

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setVisible(false);
            setLoading(false);
        }, 1000);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onSelect = (newValue: Moment) => {
        setValue(newValue);
        setSelectedValue(newValue);
        showModal();
    };

    const onPanelChange = (newValue: Moment) => {
        setValue(newValue);
    };

    const monthCellRender = (newValue: Moment) => {
        const isAvailable = getMonthData(newValue);

        return isAvailable ? <h1>KAT</h1> : null;
    };

    const dateCellRender = (newValue: Moment) => {
        const listData = getListData(newValue);

        return (
            <ul>
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge
                            status={item.type as BadgeProps['status']}
                            text={item.content}
                        />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <StandardLayout>
            <PageHeader onBack={() => navigate(-1)} title="Mentor Attendance" />
            <Alert
                message={`You selected date: ${selectedValue?.format(
                    'YYYY-MM-DD'
                )}`}
            />
            <Calendar
                value={value}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
            />
            <Modal
                visible={visible}
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
                        loading={loading}
                        onClick={handleOk}
                    >
                        Tandai 0
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Tandai 1
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Tandai 2
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Tandai 3
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Tandai 4
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Tandai 5
                    </Button>,
                ]}
            >
                <text>
                    You selected date: {selectedValue?.format('YYYY-MM-DD')}
                </text>
            </Modal>
        </StandardLayout>
    );
};
