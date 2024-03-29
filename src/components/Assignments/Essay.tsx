import { Col, Form, Input, InputNumber, Row } from "antd";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { AssignmentComponentProps } from ".";
import { WorkspaceContext } from "../../context";

export const Essay = (item: AssignmentComponentProps) => {
    const [answer, setAnswer] = useState<string | undefined>(undefined);
    const [score, setScore] = useState<number | undefined>(undefined);
    const { data, setData, scoreData, setScoreData }: any = React.useContext(WorkspaceContext);

    const handleChange = (e: any) => {
        setAnswer(e.target.value);
        setData({ ...data, [item.id]: e.target.value });
        setScore(scoreData[item.id]);
    }

    const handleScoreChange = (e: any) => {
        if (e == null) {
            e = 0;
        }
        setScore(e);
        setScoreData({ ...scoreData, [item.id]: e });
    }

    const handleBlur = (e: any) => {
        if (score === null || score === undefined) {
            handleScoreChange(0);
        }
    }

    useEffect(() => {
        setAnswer(data[item.id]);
        setScore(scoreData[item.id]);
    }, [scoreData, data]);

    return (
        <Form.Item label={<ReactMarkdown className="whitespace-pre-line">{`[${item.question_no}] ${item.question}`}</ReactMarkdown>} key={item.id}>
            <Input.Group>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} xl={20}>
                        <Input.TextArea onBlur={handleChange} onChange={handleChange} disabled={!item.editAnswer}
                            maxLength={4000} rows={3} autoSize={{ minRows: 2, maxRows: 6 }}
                            showCount value={answer} />
                    </Col>
                    {item.max_score > 0 ? <Col span={3}>
                        <InputNumber addonAfter={item.max_score} onBlur={handleBlur}
                            onChange={handleScoreChange} min={0} max={item.max_score}
                            value={score} disabled={!item.editScore} />
                    </Col> : <></>}
                </Row>
                {item.correct_answer ? <Row gutter={[16, 16]} align="middle">
                    <p className="text-gray-400">Correct Answer: {item.correct_answer}</p>
                </Row> : <></>}
            </Input.Group>
        </Form.Item>);
}