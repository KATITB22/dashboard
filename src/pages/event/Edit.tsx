import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, DatePicker, TimePicker, Select } from 'antd';
import { StandardLayout } from '../../layout/StandardLayout';

export const EditEvent = () => {
    const { id } = useParams();
    return (
        <StandardLayout>
            <h1 className="font-bold mb-3">Edit Event</h1>
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
                    <Input defaultValue={id} />
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
                    <DatePicker style={{ width: '100%' }} />
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
                    <TimePicker style={{ width: '100%' }} />
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
                    <TimePicker style={{ width: '100%' }} />
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
                    <Select placeholder="Pick a method">
                        <Select.Option value="group presence">
                            Group Presence
                        </Select.Option>
                        <Select.Option value="self presence">
                            Self Presence
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        style={{ background: '#1890ff', marginRight: 10 }}
                    >
                        Save
                    </Button>
                    <Button
                        style={{
                            color: '#000',
                            borderColor: '#1890ff',
                        }}
                    >
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </StandardLayout>
    );
};
