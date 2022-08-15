import React, { useState } from "react";
import { PageHeader, Form, Input, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom"
import { StandardLayout } from "../../layout/StandardLayout";
import ReactMarkdown from "react-markdown";

export const AddJarkom = () => {
    const [data, setData] = useState({
        title: '',
        jarkom: '',
    });
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const navigate = useNavigate();
    const { TextArea } = Input; 

    const handleJarkomTitleChange = (e: any) => {
        setData({
            ...data,
            title: e.target.value,
        });
    }

    const handleJarkomChange = (e: any) => {
        setData({
            ...data,
            jarkom: e.target.value,
        });
    }

    return (
        <StandardLayout allowedRole={"Committee"} title={"Add Jarkom"} >
            <PageHeader onBack={() => navigate(-1)} title="Add Jarkom" />
            <Form
                layout="vertical"
                wrapperCol={{ span: 10 }}
            >
                <Form.Item
                    label="Jarkom Title"
                    name="jarkom-title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your jarkom title!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Input your jarkom title"
                        onChange={handleJarkomTitleChange}
                    />
                </Form.Item>
                <Form.Item
                    label="Jarkom"
                    name="jarkom"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your jarkom!',
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Input your jarkom"
                        allowClear
                        onChange={handleJarkomChange}
                    />
                </Form.Item>
                <div className="flex flex-row gap-2 flex-wrap">
                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={() => setIsVisible(true)}
                        >
                            Preview
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="reset"
                            onClick={() => console.log("Pie kabare")}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Form>
            <Modal
                title="Preview Jarkom"
                visible={isVisible}
                onOk={() => setIsVisible(false)}
                onCancel={() => setIsVisible(false)}
            >
                {data.jarkom === "" ? "Empty" :
                    <ReactMarkdown>
                        {data.jarkom}
                    </ReactMarkdown>
                }
            </Modal>
        </StandardLayout>
    )
}