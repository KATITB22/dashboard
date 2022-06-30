import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input, PageHeader } from 'antd';
import { StandardLayout } from '../../layout/StandardLayout';

export const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <StandardLayout>
            <PageHeader onBack={() => navigate(-1)} title="Event Detail" />
            <Form
                layout="vertical"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 8 }}
            >
                <Form.Item label="Event Name" name="event-name">
                    <Input defaultValue={id} disabled />
                </Form.Item>
                <Form.Item label="Attendance Start" name="attendance-start">
                    <Input defaultValue={id} disabled />
                </Form.Item>
                <Form.Item label="Attendance End" name="attendance-end">
                    <Input defaultValue={id} disabled />
                </Form.Item>
                <Form.Item label="Attendance Type" name="attendance-type">
                    <Input defaultValue={id} disabled />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        style={{ marginRight: 10 }}
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
