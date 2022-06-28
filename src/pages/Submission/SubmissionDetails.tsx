import { Button, Col, Row, Form, Input, InputNumber, PageHeader } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';

const data = [
    {
        id: '1',
        question: 'Apa kepanjangan dari HMIF?',
    },
    {
        id: '2',
        question: 'Apa kepanjangan dari HMIF?',
    },
    {
        id: '3',
        question: 'Apa kepanjangan dari HMIF?',
    },
    {
        id: '4',
        question: 'Apa kepanjangan dari HMIF?',
    },
    {
        id: '5',
        question: 'Apa kepanjangan dari HMIF?',
    },
];

export const SubmissionDetails = () => {
    const navigate = useNavigate();

    return (
        <StandardLayout>
            <PageHeader onBack={() => navigate(-1)} title="Submission" />
            <Row justify="center">
                <Col span={24}>
                    <Form layout="vertical">
                        {data.map((item) => (
                            <Form.Item label={item.question} name={item.id}>
                                <Input.Group>
                                    <Row gutter={[16, 16]} align="middle">
                                        <Col xs={24} xl={20}>
                                            <Input.TextArea />
                                        </Col>
                                        <Col span={3}>
                                            <InputNumber addonAfter="100" />
                                        </Col>
                                    </Row>
                                </Input.Group>
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </StandardLayout>
    );
};
