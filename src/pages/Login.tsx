import { Form, Input, Button, Card, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import AuthService from '../service/auth';
import { useEffect, useState } from 'react';
import APIClient from '../utils/api-client';
import Logo from "../resource/logo.png";

export const Login = ({ setState }: { setState: Function }) => {
    const [loading, setLoading] = useState(false);

    const redirectIfHaveToken: Function = async () => {
        const token = await APIClient.checkToken();
        if (Object.keys(token).length > 0) {
            setState(true);
            return;
        }
    }

    useEffect(() => {
        redirectIfHaveToken();
    }, []);

    const onFinish = async (e: any) => {
        setLoading(true);
        await AuthService.login(e.username, e.password,
            (response) => {
                toast.success(`Login Successfull (${response.user.username})`);
                setState(true);
                setLoading(false);
            },
            (error) => {
                if (error.toString().includes("Invalid identifier")) {
                    toast.error("NIM atau password salah atau tidak ditemukan!");
                } else {
                    toast.error(error.toString());
                }
                setState(false);
                setLoading(false);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="basis-3/4 md:basis-7/12 md:scale-[1.3] lg:max-w-lg">
                <Spin spinning={loading} tip="Loading...">
                    <Card className="rounded-lg shadow-lg border-0">
                        <div className="flex justify-center mb-3 md:mb-5 flex-wrap">
                            <div className='w-1/2'>
                                <img src={Logo} className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                            </div>
                        </div>
                        <Form
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your NIM!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="NIM"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: '0px' }}>
                                <div className="flex justify-center">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        shape="round"
                                        ghost={false}
                                        size="large"
                                    >
                                        <span className="w-48">Sign In</span>
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Card>
                </Spin>
            </div>
        </div>
    );
};
