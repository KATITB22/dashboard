import { Col, Form, Input, InputNumber, Radio, Row, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { AssignmentComponentProps } from ".";
import * as _ from "lodash";

export const PilihanGanda = (item: AssignmentComponentProps) => {
    if (!item.metadata) return null;
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
        <Form.Item label={`${item.question_no}. ${item.question}`} key={item.id}>
            <Input.Group>
                <Row gutter={[16, 16]} align="middle">
                    <Col
                        xs={24} xl={20}>
                        <Radio.Group onChange={instantChange} disabled={!item.editAnswer}
                            value={answer}>
                            <Space direction="vertical">
                                {options.map((each) => {
                                    if (!item.metadata['pilihan_' + each]) return null;

                                    return <Radio value={each} key={`${each}-${item.id}`}>{each}. {item.metadata['pilihan_' + each].toString()}</Radio>
                                })}
                            </Space>
                        </Radio.Group>
                    </Col>
                    <Col span={3}>
                        <InputNumber addonAfter={item.max_score} min={0} value={item.score[item.id]} disabled={!item.editScore} />
                    </Col>
                </Row>
            </Input.Group>
        </Form.Item>);
}