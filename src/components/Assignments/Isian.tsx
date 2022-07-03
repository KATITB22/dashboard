import { Col, Form, Input, InputNumber, Row, } from "antd";
import { useCallback, useEffect, useState } from "react";
import { AssignmentComponentProps } from ".";
import * as _ from "lodash";

export const Isian = (item: AssignmentComponentProps) => {
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
                        <Input onBlur={handleChange} onChange={handleChange} disabled={!item.editAnswer} maxLength={150}
                            showCount value={answer} />
                    </Col>
                    <Col span={3}>
                        <InputNumber addonAfter={item.max_score} min={0} value={item.score[item.id]} disabled={!item.editScore} />
                    </Col>
                </Row>
            </Input.Group>
        </Form.Item>
    );
}