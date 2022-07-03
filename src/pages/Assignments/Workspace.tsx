import { Button, Col, Row, Form, PageHeader, } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import * as _ from "lodash";
import { Isian } from '../../components/Assignments/Isian';
import { PilihanGanda } from '../../components/Assignments/PilihanGanda';
import { Essay } from '../../components/Assignments/Essay';
import Service from '../../service/assignments';
import { defaultFailureCallback } from '../../service';
import moment from 'moment';
import { AssignmentComponentProps } from '../../components/Assignments';

interface Time {
    start: moment.Moment;
    end: moment.Moment;
    range: string;
}

export const Workspace = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    if (!id) return null;
    const [questions, setQuestions] = useState<AssignmentComponentProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("Workspace");
    const [data, setData] = useState<object>({});
    const [time, setTime] = useState<Time>({
        start: moment(),
        end: moment(),
        range: ""
    });

    useEffect(() => {
        setLoading(true);
        Service.findOrGetEntry(id, (response) => {
            console.log(response);
            setTitle(response.topic.title);

            const start = moment(response.topic.start);
            const end = moment(response.topic.end);
            const timeFormat = "DD MMM YY HH:MM";
            setTime({
                start, end, range: `${start.format(timeFormat)} - ${end.format(timeFormat)}`
            });

            const questions: AssignmentComponentProps[] = response.topic.questions.map((each: any) => {

                return ({
                    id: each.id,
                    metadata: each.metadata,
                    data, dataHandler: setData,
                    question: each.question,
                    question_no: each.question_no,
                    max_score: each.score,
                    editScore: false,
                    editAnswer: (response.submit_time === null),
                    type: each.metadata.type,
                    score: {}
                })
            });

            if (response.score) {
                questions.forEach((each) => {
                    each.score = response.score;
                });
            }

            if (response.answers) {
                setData(response.answers);
            }

            setQuestions(questions);
            setLoading(false);
        }, (err) => {
            defaultFailureCallback(err);
            setLoading(false);
        });
    }, []);

    return (
        <StandardLayout allowedRole={["Committee", "Mentor", "Participant"]}>
            <PageHeader onBack={() => navigate(-1)} title={"Workspace: " + title} />
            {!loading ? <Row justify="center">
                <Col span={24}>
                    <p>Time: {time.range}</p>
                    <Form layout="vertical">
                        {questions.map((each: any) => {
                            if (each.type === 'ISIAN') {
                                return <Isian key={each.id} data={data} dataHandler={setData} {...each} />
                            } else if (each.type === 'PILIHAN GANDA') {
                                return <PilihanGanda key={each.id} data={data} dataHandler={setData} {...each} />
                            } else {
                                return <Essay key={each.id} data={data} dataHandler={setData} {...each} />
                            }
                        })}
                        <Form.Item>
                            <Button
                                size="large"
                                type="primary"
                                onClick={() => console.log(data)}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row> : <div>Loading...</div>}
        </StandardLayout>
    );
};
