import { Col, Form, Input, InputNumber, Radio, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { AssignmentComponentProps } from ".";
import { WorkspaceContext } from "../../context";

export const PilihanGanda = (item: AssignmentComponentProps) => {
    if (!item.metadata) return null;
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

    const options = ['A', 'B', 'C', 'D', 'E'];
    return (
        <Form.Item label={<ReactMarkdown>{`[${item.question_no}] ${item.question}`}</ReactMarkdown>} key={item.id}>
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
                        <InputNumber addonAfter={item.max_score} onBlur={handleBlur} onChange={handleScoreChange} min={0} max={item.max_score} value={score} disabled={!item.editScore} />
                    </Col>
                </Row>
                {item.correct_answer ? <Row gutter={[16, 16]} align="middle">
                    <p className="text-gray-400">Correct Answer: {item.correct_answer}</p>
                </Row> : <></>}
            </Input.Group>
        </Form.Item>);
}