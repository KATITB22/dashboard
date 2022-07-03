import { Button, Col, Row, Form, Input, InputNumber, PageHeader, Radio, Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import * as _ from "lodash";

const qdata = [
    {
        id: '1',
        type: 'PILIHAN GANDA',
        question: 'Apa definisi dari apa?',
        metadata: {
            pilihan_A: 'gatau',
            pilihan_B: 'gatau',
            pilihan_C: 'gatau',
            pilihan_D: 'gatau',
            pilihan_E: 'gatau',
        }
    },
    {
        id: '2',
        question: 'Apa definisi dari apa?',
        type: 'ISIAN',
    },
    {
        id: '3',
        question: 'Apa definisi dari apa?',
        type: 'ESSAY',
    },
];

interface QuestionFormProps {
    dataHandler: Function;
    data: any;
    id: string;
    question: string;
    metadata?: any;
    hideScore?: boolean;
    editScore?: boolean;
    editAnswer?: boolean;
}

const Essay = (item: QuestionFormProps) => {
    const [answer, setAnswer] = useState<string | undefined>(undefined);
    const handleDebounce = (val: any) => {
        item.dataHandler({
            ...item.data,
            [item.id]: val,
        });
        setAnswer(val);
    }

    useEffect(() => {
        setAnswer(item.data[item.id]);
    }, []);
    const debounceFn = useCallback(_.debounce(handleDebounce, 1000), []);
    const handleChange = (e: any) => debounceFn(e.target.value);

    return (
        <Form.Item label={item.question} key={item.id}>
            <Input.Group>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} xl={20}>
                        <Input.TextArea onBlur={handleChange} onChange={handleChange} disabled={!item.editAnswer}
                            maxLength={4000} rows={3} autoSize={{ minRows: 2, maxRows: 6 }}
                            showCount value={answer} />
                    </Col>
                    <Col span={3} hidden={item.hideScore}>
                        <InputNumber addonAfter="100" min={0} value={undefined} disabled={!item.editScore} />
                    </Col>
                </Row>
            </Input.Group>
        </Form.Item>);
}

const Isian = (item: QuestionFormProps) => {
    const [answer, setAnswer] = useState<string | undefined>(undefined);
    const handleDebounce = (val: any) => {
        item.dataHandler({
            ...item.data,
            [item.id]: val,
        });
        setAnswer(val);
    }

    useEffect(() => {
        setAnswer(item.data[item.id]);
    }, []);

    const debounceFn = useCallback(_.debounce(handleDebounce, 1000), []);
    const handleChange = (e: any) => debounceFn(e.target.value);

    return (
        <Form.Item label={item.question} key={item.id}>
            <Input.Group>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} xl={20}>
                        <Input onBlur={handleChange} onChange={handleChange} disabled={!item.editAnswer} maxLength={150}
                            showCount value={answer} />
                    </Col>
                    <Col span={3} hidden={item.hideScore}>
                        <InputNumber addonAfter="100" min={0} value={undefined} disabled={!item.editScore} />
                    </Col>
                </Row>
            </Input.Group>
        </Form.Item>);
}

const PilihanGanda = (item: QuestionFormProps) => {
    if (!item.metadata) return <></>;
    const [answer, setAnswer] = useState<string | undefined>(undefined);

    const handleDebounce = (val: any) => {
        item.dataHandler({
            ...item.data,
            [item.id]: val,
        });
    }
    const debounceFn = useCallback(_.debounce(handleDebounce, 1500), []);
    const instantChange = (val: any) => {
        setAnswer(val.target.value);
        debounceFn(val.target.value)
    }

    useEffect(() => {
        setAnswer(item.data[item.id]);
    }, []);

    const options = ['A', 'B', 'C', 'D', 'E'];
    return (
        <Form.Item label={item.question} key={item.id}>
            <Input.Group>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} xl={20}>
                        <Radio.Group onChange={instantChange} disabled={!item.editAnswer}
                            value={answer}>
                            <Space direction='vertical'>
                                {options.map((each) => {
                                    if (!item.metadata['pilihan_' + each]) return <></>

                                    return <Radio value={each}>{each}. {item.metadata['pilihan_' + each].toString()}</Radio>
                                })}
                            </Space>
                        </Radio.Group>
                    </Col>
                    <Col span={3} hidden={item.hideScore}>
                        <InputNumber addonAfter="100" min={0} value={undefined} disabled={!item.editScore} />
                    </Col>
                </Row>
            </Input.Group>
        </Form.Item>);
}

export const Workspace = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<object>({ "1": 'A' });
    const onFinish = (req: any) => {
        console.log(req);
    }

    console.log(data);

    return (
        <StandardLayout>
            <PageHeader onBack={() => navigate(-1)} title="Submission" />
            <Row justify="center">
                <Col span={24}>
                    <Form layout="vertical">
                        {qdata.map((each: any) => {
                            each.hideScore = true;
                            each.editAnswer = true;
                            if (each.type === 'ISIAN') {
                                return <Isian key={each.id} data={data} dataHandler={setData} {...each} />
                            } else if (each.type === 'PILIHAN GANDA') {
                                return <PilihanGanda key={each.id} data={data} dataHandler={setData} {...each} />
                            } else {
                                return <Essay key={each.id} data={data} dataHandler={setData} {...each} />
                            }
                        })}
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
