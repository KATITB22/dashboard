import { Col, Form, Input, InputNumber, Row, } from "antd";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { AssignmentComponentProps } from ".";
import { WorkspaceContext } from "../../context";

export const Isian = (item: AssignmentComponentProps) => {
    const [answer, setAnswer] = useState<string | undefined>(undefined);
    const [score, setScore] = useState<number | undefined>(undefined);
    const { data, setData, scoreData, setScoreData }: any = React.useContext(WorkspaceContext);

    const handleChange = (e: any) => {
        setAnswer(e.target.value);
        setData({ ...data, [item.id]: e.target.value });
    }

    const handleScoreChange = (e: any) => {
        setScore(e);
        setScoreData({ ...scoreData, [item.id]: e });
    }

    const handleBlur = (e: any) => {
        if (score === null || score === undefined) {
            let finalScore = 0;
            if (data[item.id] && item.correct_answer && item.max_score !== undefined) {
                if (data[item.id].toLowerCase() == item.correct_answer.toString().toLowerCase()) {
                    finalScore = item.max_score;
                }
            }
            handleScoreChange(finalScore);
        }
    }

    useEffect(() => {
        setAnswer(data[item.id]);
        setScore(scoreData[item.id]);
    }, [scoreData, data]);

    return (
        <Form.Item key={item.id}>
            <Input.Group>
                <Row>
                    <ReactMarkdown className="whitespace-pre-line">{`[${item.question_no}] ${item.question}`}</ReactMarkdown>
                </Row>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} xl={20}>
                        <Input onBlur={handleChange} onChange={handleChange} disabled={!item.editAnswer} maxLength={150}
                            showCount value={answer} />
                    </Col>
                    {item.max_score > 0 ? 
                    <Col span={3}>
                        <InputNumber addonAfter={item.max_score}
                            onChange={handleScoreChange} onBlur={handleBlur} min={0} max={item.max_score}
                            value={score} disabled={!item.editScore} />
                    </Col> : <></>}
                </Row>
                {item.correct_answer ? <Row gutter={[16, 16]} align="middle">
                    <p className="text-gray-400">Correct Answer: {item.correct_answer}</p>
                </Row> : <></>}
            </Input.Group>
        </Form.Item>
    );
}