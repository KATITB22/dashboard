import { Col, Form, Input, InputNumber, Row, } from "antd";
import React, { useEffect, useState } from "react";
import { AssignmentComponentProps } from ".";
import { WorkspaceContext } from "../../context";

export const Scoring = (item: AssignmentComponentProps) => {
    const [score, setScore] = useState<number | undefined>(undefined);
    const { data, scoreData, setScoreData }: any = React.useContext(WorkspaceContext);

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
        setScore(scoreData[item.id]);
    }, [scoreData, data]);

    return (
        <Form.Item key={item.id} label={`Komponen Penilaian: ${item.question}`}>
            <Input.Group>
                <Row gutter={[16, 16]} align="middle">
                    <Col span={3}>
                        <InputNumber addonAfter={item.max_score}
                            onChange={handleScoreChange} onBlur={handleBlur} min={0} max={item.max_score}
                            value={score} disabled={!item.editScore} />
                    </Col>
                </Row>
            </Input.Group>
        </Form.Item>
    );
}