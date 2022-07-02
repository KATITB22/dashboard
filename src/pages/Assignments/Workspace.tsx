import { Button, Col, Row, Form, Input, InputNumber, PageHeader } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import * as _ from "lodash";

const qdata = [
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

const WorkspaceForms = (item: any) => {
    const handleDebounce = (val: any) => {
        item.dataHandler({
            ...item.data,
            [item.id]: val,
        });
    }
    const debounceFn = useCallback(_.debounce(handleDebounce, 1000), []);
    const handleChange = (e: any) => debounceFn(e.target.value);

    return (
        <Form.Item label={item.question} >
            <Input.Group>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} xl={20}>
                        <Input.TextArea onBlur={handleChange} onChange={handleChange} />
                    </Col>
                    <Col span={3}>
                        <InputNumber addonAfter="100" min={0} value={undefined} />
                    </Col>
                </Row>
            </Input.Group>
        </Form.Item>)
}

export const Workspace = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<object>({});
    const onFinish = (req: any) => {
        console.log(req);
    }

    useEffect(() => console.log("ha"), [])

    console.log(data);

    return (
        <StandardLayout>
            <PageHeader onBack={() => navigate(-1)} title="Submission" />
            <Row justify="center">
                <Col span={24}>
                    <Form layout="vertical">
                        {qdata.map((each) => <WorkspaceForms key={each.id} data={data} dataHandler={setData} {...each} />)}
                        <Form.Item>
                            <Button
                                size="large"
                                type="primary"
                                onClick={() => console.log(data)}
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
