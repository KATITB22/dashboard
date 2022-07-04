import { Col, Form, Input, InputNumber, Radio, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { AssignmentComponentProps } from ".";
import { WorkspaceContext } from "../../context";

export const PilihanGanda = (item: AssignmentComponentProps) => {
    if (!item.metadata) return null;
    const [answer, setAnswer] = useState<string | undefined>(undefined);
    const { data, setData }: any = React.useContext(WorkspaceContext);
    const handleChange = (e: any) => {
        setAnswer(e.target.value);
        setData({ ...data, [item.id]: e.target.value });
    }

    useEffect(() => {
        setAnswer(data[item.id]);
    }, []);

    const options = ['A', 'B', 'C', 'D', 'E'];
    return (
        <Form.Item label={`${item.question_no}. ${item.question}`} key={item.id}>
            <Input.Group>
                <Row gutter={[16, 16]} align="middle">
                    <Col
                        xs={24} xl={20}>
                        <Radio.Group onChange={handleChange} disabled={!item.editAnswer}
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