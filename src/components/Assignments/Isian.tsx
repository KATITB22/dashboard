import { Col, Form, Input, InputNumber, Row, } from "antd";
import React, { useEffect, useState } from "react";
import { AssignmentComponentProps } from ".";
import { WorkspaceContext } from "../../context";

export const Isian = (item: AssignmentComponentProps) => {
    const [answer, setAnswer] = useState<string | undefined>(undefined);
    const { data, setData }: any = React.useContext(WorkspaceContext);

    useEffect(() => {
        setAnswer(data[item.id]);
    }, []);

    const handleChange = (e: any) => {
        setAnswer(e.target.value);
        setData({ ...data, [item.id]: e.target.value });
    }

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