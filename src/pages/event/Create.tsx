import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventService from '../../service/event';
import { defaultFailureCallback } from '../../service';
import type { DatePickerProps } from 'antd';
import { Button, Form, Input, DatePicker, Select, PageHeader } from 'antd';
import { StandardLayout } from '../../layout/StandardLayout';
import { toast } from 'react-toastify';

export const CreateEvent = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: '',
        attendance_start: '',
        attendance_end: '',
        attendance_type: '',
    });

    const handleEventNameChange = (e: any) => {
        setData({
            ...data,
            title: e.target.value,
        });
    };

    const handleAttendanceStartChange = (
        _: DatePickerProps['value'],
        dateString: string
    ) => {
        setData({
            ...data,
            attendance_start: new Date(dateString).toISOString(),
        });
    };

    const handleAttendanceEndChange = (
        _: DatePickerProps['value'],
        dateString: string
    ) => {
        setData({
            ...data,
            attendance_end: new Date(dateString).toISOString(),
        });
    };

    const handleAttendanceTypeChange = (value: string) => {
        setData({
            ...data,
            attendance_type: value,
        });
    };

    const handleSubmit = async () => {
        // submit data
        await eventService.createEvent(
            data,
            (res) => toast.success("Successfully create event!"),
            (err) => defaultFailureCallback(err)
        );
        navigate('/event');
    };

    return (
        <StandardLayout allowedRole={"Committee"}>
            <PageHeader onBack={() => navigate(-1)} title="Create Event" />
            <Form
                layout="vertical"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 8 }}
            >
                <Form.Item
                    label="Event Name"
                    name="event-name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the event name!',
                        },
                    ]}
                >
                    <Input name="eventName" onChange={handleEventNameChange} />
                </Form.Item>
                <Form.Item
                    label="Attendance Start"
                    name="attendance-start"
                    rules={[
                        {
                            required: true,
                            message: 'Please input attendance start time!',
                        },
                    ]}
                >
                    <DatePicker
                        showTime
                        onChange={handleAttendanceStartChange}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    label="Attendance End"
                    name="attendance-end"
                    rules={[
                        {
                            required: true,
                            message: 'Please input attendance end time!',
                        },
                    ]}
                >
                    <DatePicker
                        showTime
                        onChange={handleAttendanceEndChange}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    label="Attendance Type"
                    name="attendance-type"
                    rules={[
                        {
                            required: true,
                            message: 'Please pick attendance type!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Pick a method"
                        onChange={handleAttendanceTypeChange}
                    >
                        <Select.Option value="GroupLeader">
                            Group Leader Presence
                        </Select.Option>
                        <Select.Option value="Self">
                            Self Presence
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </StandardLayout>
    );
};
