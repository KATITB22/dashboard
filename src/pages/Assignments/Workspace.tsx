import { Button, Col, Row, Form, PageHeader, Spin, Modal, } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import * as _ from "lodash";
import { Isian } from '../../components/Assignments/Isian';
import { PilihanGanda } from '../../components/Assignments/PilihanGanda';
import { Essay } from '../../components/Assignments/Essay';
import Service from '../../service/assignments';
import { defaultFailureCallback, SuccessCallbackFunction } from '../../service';
import moment from 'moment';
import { AssignmentComponentProps } from '../../components/Assignments';
import { WorkspaceContext } from '../../context';
import { toast } from 'react-toastify';

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
    const [spinning, setSpinning] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("Workspace");
    const [data, setData] = useState<Record<string, any>>({});
    const [submissionId, setSubmissionId] = useState<string>("");
    const [submitTime, setSubmitTime] = useState<moment.Moment | null>(null);
    const [time, setTime] = useState<Time>({
        start: moment(),
        end: moment(),
        range: ""
    });
    const [lastUpdate, setLastUpdate] = useState<string>("?");
    const [saving, setSaving] = useState<boolean>(false);
    const [lastSavedAnswer, setLastSavedAnswer] = useState<any>({});

    const canSave = () => {
        if (!lastSavedAnswer || !data) return true;

        delete lastSavedAnswer.client_timestamp;
        delete data.client_timestamp;

        return JSON.stringify(lastSavedAnswer) != JSON.stringify(data);
    }

    const handleDebounceFn = (submissionId: string, data: any) => {
        if (!canSave()) return;
        if (!data) return;
        const copied = { ...data };
        copied.client_timestamp = new Date();
        setSaving(true);
        Service.postAnswers(submissionId, copied, () => {
            setLastUpdate(moment().format("DD MMM YY HH:mm:ss"));
            setLastSavedAnswer(copied);
            setSaving(false);
        }, (err) => {
            setSaving(false);
        });
    }

    const debounceFn = useCallback(_.debounce(handleDebounceFn, 10000), []);

    useEffect(() => {
        debounceFn.cancel();
        debounceFn(submissionId, data);
    }, [data]);

    const successHandler: SuccessCallbackFunction = (response) => {
        setTitle(response.topic.title);
        setSubmissionId(response.id);
        setLastUpdate(moment().format("DD MMM YY HH:mm:ss"));
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
                editAnswer: (submitTime === null),
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
            setLastSavedAnswer(response.answers);
        }

        if (response.submit_time) {
            setSubmitTime(moment(response.submit_time));
        }

        setQuestions(questions);
        setLoading(false);
    }

    const onUnsubmit = () => {
        setSpinning(true);
        Service.unsubmit(submissionId, (res) => {
            setSubmitTime(null);
            setLastUpdate(moment().format("DD MMM YY HH:mm:ss"));
            setLastSavedAnswer(res.answers);
            setData(res.answers);
            setSpinning(false);
            toast.warning("Melakukan unsubmit, jangan lupa di submit setelah di edit!");
        }, (err) => toast.error("Gagal melakukan unsubmit! " + err.toString()));
    };

    const onSubmit = () => {
        setSpinning(true);
        debounceFn.cancel();
        const copied = { ...data };
        copied.client_timestamp = new Date();
        Service.submit(submissionId, copied, (res) => {
            setSubmitTime(moment(res.submit_time));
            setLastUpdate(moment().format("DD MMM YY HH:mm:ss"));
            setLastSavedAnswer(res.answers);
            setData(res.answers);
            setSpinning(false);
            toast.success("Berhasil melakukan submit!");
        }, (err) => toast.error("Gagal melakukan submit! " + err.toString()));
    };

    const loadData = () => {
        setLoading(true);
        Service.findOrGetEntry(id, successHandler, (err) => {
            defaultFailureCallback(err);
            setLoading(false);
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <StandardLayout allowedRole={["Committee", "Mentor", "Participant"]}>
            <WorkspaceContext.Provider value={{ data, setData }}>
                <PageHeader onBack={() => navigate(-1)} title={"Workspace: " + title} />
                <p>Assignment Time: {time.range}</p>
                <Spin tip="Saving Answer" spinning={saving}>
                    <div className='flex flex-row'>
                        <p>Terakhir kali disimpan pada {lastUpdate}</p>
                        <Button type="primary" className='ml-3' onClick={() => {
                            handleDebounceFn(submissionId, data);
                        }} disabled={!canSave()}>Simpan</Button>
                    </div>
                </Spin>
                <br />
                {!loading ? <Spin tip="Submitting..." spinning={spinning}>
                    <Row justify="center">
                        <Col span={24}>
                            <Form layout="vertical">
                                {questions.map((each: any) => {
                                    if (each.type === 'ISIAN') {
                                        return <Isian key={each.id} data={data} dataHandler={setData} {...each} editAnswer={(submitTime === null)} />
                                    } else if (each.type === 'PILIHAN GANDA') {
                                        return <PilihanGanda key={each.id} data={data} dataHandler={setData} {...each} editAnswer={(submitTime === null)} />
                                    } else {
                                        return <Essay key={each.id} data={data} dataHandler={setData} {...each} editAnswer={(submitTime === null)} />
                                    }
                                })}
                                <Form.Item>
                                    <Button
                                        size="large"
                                        type="primary"
                                        onClick={(submitTime) ? onUnsubmit : onSubmit}
                                        danger={!!submitTime}
                                    >
                                        {(submitTime) ? 'Unsubmit' : 'Submit'}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Spin> : <div>Loading...</div>}
            </WorkspaceContext.Provider>
        </StandardLayout>
    );
};
