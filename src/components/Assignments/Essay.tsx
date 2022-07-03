import { Col, Form, Input, InputNumber, Radio, Row, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { AssignmentComponentProps } from ".";
import * as _ from "lodash";

export const Essay = (item: AssignmentComponentProps) => {
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
        <Form.Item label={`${item.question_no}. ${item.question}`} key={item.id}>
            <Input.Group>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} xl={20}>
                        <Input.TextArea onBlur={handleChange} onChange={handleChange} disabled={!item.editAnswer}
                            maxLength={4000} rows={3} autoSize={{ minRows: 2, maxRows: 6 }}
                            showCount value={answer} />
                    </Col>
                    <Col span={3}>
                        <InputNumber addonAfter={item.max_score} min={0} value={item.score[item.id]} disabled={!item.editScore} />
                    </Col>
                </Row>
            </Input.Group>
        </Form.Item>);
}