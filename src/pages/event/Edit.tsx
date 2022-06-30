import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, DatePicker, Select } from 'antd';
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
                    <Input name="eventName" defaultValue={id} />
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
                    <DatePicker showTime style={{ width: '100%' }} />
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
                    <DatePicker showTime style={{ width: '100%' }} />
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
                    <Select placeholder="Pick a method">
                        <Select.Option value="group">
                            Group Presence
                        </Select.Option>
                        <Select.Option value="self">
                            Self Presence
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" style={{ marginRight: 10 }}>
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
