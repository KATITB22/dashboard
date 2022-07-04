import { Col, Form, Input, InputNumber, Row } from "antd";
import React, { useEffect, useState } from "react";
import { AssignmentComponentProps } from ".";
import { WorkspaceContext } from "../../context";

export const Essay = (item: AssignmentComponentProps) => {
    const [answer, setAnswer] = useState<string | undefined>(undefined);
    const { data, setData }: any = React.useContext(WorkspaceContext);
    const handleChange = (e: any) => {
        setAnswer(e.target.value);
        setData({ ...data, [item.id]: e.target.value });
    }

    useEffect(() => {
        setAnswer(data[item.id]);
    }, []);

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