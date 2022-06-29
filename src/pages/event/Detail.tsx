import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { StandardLayout } from '../../layout/StandardLayout';

export const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <StandardLayout>
            <h1 className="font-bold mb-3">Event Detail</h1>
            <Form
                layout="vertical"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 8 }}
            >
                <Form.Item label="Event Name" name="event-name">
                    <Input defaultValue={id} disabled />
                </Form.Item>
                <Form.Item label="Date" name="date">
                    <Input defaultValue={id} disabled />
                </Form.Item>
                <Form.Item label="Start Time" name="start-time">
                    <Input defaultValue={id} disabled />
                </Form.Item>
                <Form.Item label="End Time" name="end-time">
                    <Input defaultValue={id} disabled />
                </Form.Item>
                <Form.Item label="Presence Method" name="presence-method">
                    <Input defaultValue={id} disabled />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        style={{ background: '#1890ff', marginRight: 10 }}
                        onClick={() => navigate(`/event/${id}/edit`)}
                    >
                        Edit
                    </Button>
                    <Button type="primary" danger>
                        Delete
                    </Button>
                </Form.Item>
            </Form>
        </StandardLayout>
    );
};
