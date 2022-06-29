import { useState } from 'react';
import type { DatePickerProps } from 'antd';
import { Button, Form, Input, DatePicker, TimePicker, Select } from 'antd';
import { StandardLayout } from '../../layout/StandardLayout';

export const CreateEvent = () => {
    const [data, setData] = useState({
        eventName: '',
        date: '',
        startTime: '',
        endTime: '',
        method: '',
    });

    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange: DatePickerProps['onChange'] = (_, dateString) => {
        setData({
            ...data,
            date: dateString,
        });
    };

    const handleStartTimeChange = (_: any, timeString: string) => {
        setData({
            ...data,
            startTime: timeString,
        });
    };

    const handleEndTimeChange = (_: any, timeString: string) => {
        setData({
            ...data,
            endTime: timeString,
        });
    };

    const handleMethodChange = (value: string) => {
        setData({
            ...data,
            method: value,
        });
    };

    const handleSubmit = () => {
        // submit data
    };

    return (
        <StandardLayout>
            <h1 className="font-bold mb-3">Create Event</h1>
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
                    <Input name="eventName" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the event date!',
                        },
                    ]}
                >
                    <DatePicker
                        onChange={handleDateChange}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    label="Start Time"
                    name="start-time"
                    rules={[
                        {
                            required: true,
                            message: 'Please input presence start time!',
                        },
                    ]}
                >
                    <TimePicker
                        onChange={handleStartTimeChange}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    label="End Time"
                    name="end-time"
                    rules={[
                        {
                            required: true,
                            message: 'Please input presence end time!',
                        },
                    ]}
                >
                    <TimePicker
                        onChange={handleEndTimeChange}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    label="Presence Method"
                    name="presence-method"
                    rules={[
                        {
                            required: true,
                            message: 'Please pick presence method!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Pick a method"
                        onChange={handleMethodChange}
                    >
                        <Select.Option value="group">
                            Group Presence
                        </Select.Option>
                        <Select.Option value="self">
                            Self Presence
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ background: '#1890ff' }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </StandardLayout>
    );
};
