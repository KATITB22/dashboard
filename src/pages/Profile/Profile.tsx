import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, PageHeader, Input, Button } from 'antd';
import { StandardLayout } from '../../layout/StandardLayout';
import { UserContext } from '../../context'
import { toast } from 'react-toastify';

export const Profile = () => {
    const navigate = useNavigate();
    const { user }: any = useContext(UserContext);

    return (
        <StandardLayout allowedRole={"Committee"}>
            <PageHeader title="Profile" />
            <Form
                layout="vertical"
                disabled={true}
                wrapperCol={{ span: 8 }}
            >
                <Form.Item
                    label="Nama"
                >
                    <Input placeholder={user.name} />
                </Form.Item>
                <Form.Item
                    label="NIM"
                >
                    <Input placeholder={user.username} />
                </Form.Item>
                <Form.Item
                    label="Faculty"
                >
                    <Input placeholder={user.faculty} />
                </Form.Item>
                <Form.Item
                    label="Campus"
                >
                    <Input placeholder={user.campus} />
                </Form.Item>
                <Form.Item
                    label="Gender"
                >
                    <Input placeholder={user.sex} />
                </Form.Item>
                <Form.Item
                    label="Password"
                >
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item
                    label="New Password"
                >
                    <Input placeholder="" />
                </Form.Item>
            </Form>
            <Button type="primary"
                onClick={() => navigate("/profile/edit")}
            >
                Edit Profile
            </Button>
        </StandardLayout>
    );
};
