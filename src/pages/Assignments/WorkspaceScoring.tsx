import { Button, Col, Row, Form, PageHeader, Spin, Descriptions, Timeline, Popconfirm, Alert } from 'antd';
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
import { WorkspaceContext } from '../../context';
import { toast } from 'react-toastify';

interface Time {
    start: moment.Moment;
    end: moment.Moment;
    range: string;
}

export const WorkspaceScoring = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    if (!id) return null;

    const [questions, setQuestions] = useState<AssignmentComponentProps[]>([]);
    const [spinning, setSpinning] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("Workspace");
    const [data, setData] = useState<Record<string, any>>({});
    const [scoreData, setScoreData] = useState<any>({});
    const [time, setTime] = useState<Time>({
        start: moment(),
        end: moment(),
        range: ""
    });
    const [user, setUser] = useState<any>({});
    const [lastUpdate, setLastUpdate] = useState<string>("?");
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        Service.getEntry(id, (response) => {
            setTitle(response.topic.title);
            setUser(response.user);
            if (response.events && Array.isArray(response.events) && response.events.length > 0) {
                const temps = response.events.map((each: any) => ({
                    ...each,
                    timestamp: moment(each.timestamp)
                }));
                temps.sort((a, b) => a.timestamp.diff(b.timestamp));
                const temps2 = temps.map((each: any) => ({
                    ...each,
                    timestamp: each.timestamp.format("DD MMM YY HH:mm:ss")
                }));
                const lastSubmit = _.findLast(temps2, (each: any) => each.action === 'Submit');
                if (lastSubmit) {
                    lastSubmit.action = 'Final Answer';
                }
                setEvents(temps2.filter((each: any) => each.action != 'Score'));
            }
            setLastUpdate(moment().format("DD MMM YY HH:mm:ss"));
            const start = moment(response.topic.start);
            const end = moment(response.topic.end);
            const timeFormat = "DD MMM YY HH:MM";
            setTime({
                start, end, range: `${start.format(timeFormat)} - ${end.format(timeFormat)}`
            });

            console.log(response);
            setScoreData(response.scores || {});
            const questions: AssignmentComponentProps[] = response.topic.questions.map((each: any) => {
                const mappedQuestion = {
                    id: each.id,
                    metadata: each.metadata,
                    data, dataHandler: setData,
                    question: each.content,
                    question_no: each.question_no,
                    max_score: each.score,
                    editScore: true,
                    editAnswer: false,
                    type: each.metadata.type,
                    hidden_metadata: each.private_metadata,
                    correct_answer: undefined,
                    score: {}
                };

                if (mappedQuestion.hidden_metadata.correct_answer) {
                    mappedQuestion.correct_answer = mappedQuestion.hidden_metadata.correct_answer;
                }

                return mappedQuestion;
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

    const actionColorMap: any = {
        'Unsubmit': 'red',
        'Submit': 'blue',
        'Save': 'green',
        'Final Answer': 'blue',
    }

    const onSubmit = () => {
        setSpinning(true);
        Service.postScores(id, scoreData, () => {
            toast.success("Berhasil menyimpan nilai!");
            setSpinning(false);
        }, (err) => {
            defaultFailureCallback(err);
            setSpinning(false);
        });
    };

    return (
        <StandardLayout allowedRole={["Committee", "Mentor", "Participant"]}>
            <WorkspaceContext.Provider value={{ data, setData, lastUpdate, scoreData, setScoreData }}>
                <PageHeader onBack={() => navigate(-1)} title={"Workspace: " + title} />
                <Spin spinning={loading} tip="Loading...">
                    <Descriptions bordered size="default" title="Information" className='my-5'>
                        <Descriptions.Item label="NIM">{user.username}</Descriptions.Item>
                        <Descriptions.Item label="Name" span={2}>{user.name}</Descriptions.Item>
                        <Descriptions.Item label="Faculty">{user.faculty}</Descriptions.Item>
                        <Descriptions.Item label="Campus">{user.campus}</Descriptions.Item>
                        <Descriptions.Item label="Sex">{user.sex == 'Unknown' ? 'No Data' : user.sex}</Descriptions.Item>
                        <Descriptions.Item label="Assignment" span={2}>{title}</Descriptions.Item>
                        <Descriptions.Item label="Time">{time.range}</Descriptions.Item>
                        <Descriptions.Item label="Activity Log" span={4}>
                            {events.length === 0 ? <>No Data</> :
                                <Timeline mode='alternate' className='mt-12'>
                                    {events.map((each: any) => {
                                        return <Timeline.Item label={each.timestamp} color={actionColorMap[each.action]}>{each.action}</Timeline.Item>
                                    })}
                                </Timeline>
                            }
                        </Descriptions.Item>
                    </Descriptions>
                </Spin>
                <Alert closable message="Auto Score" description={<>
                    <p>Auto-Score hanya berlaku untuk soal bertipe pilihan ganda dan isian.</p>
                    <p>Untuk soal isian, harap dicek lagi karena perbedaan formatting dianggap salah.</p>
                    <p>Nilai yang sudah di auto-score <b>DAPAT</b> diubah manual apabila diperlukan.</p>
                </>} type="info" className='my-5 max-w-2xl' showIcon />
                {!loading ? <Spin tip="Scoring..." spinning={spinning}>
                    <Row justify="center">
                        <Col span={24}>
                            <Form layout="vertical">
                                {questions.map((each: any) => {
                                    if (each.type === 'ISIAN') {
                                        return <Isian key={each.id} {...each} />
                                    } else if (each.type === 'PILIHAN GANDA') {
                                        return <PilihanGanda key={each.id} {...each} />
                                    } else {
                                        return <Essay key={each.id} {...each} />
                                    }
                                })}
                                <Form.Item>
                                    <Button
                                        size="large"
                                        type="primary"
                                        onClick={onSubmit}>Save</Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Spin> : <div>Loading...</div>}
            </WorkspaceContext.Provider>
        </StandardLayout>
    );
};
