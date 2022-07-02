import { Button, Form, Input, DatePicker, Select, Upload, Spin, Checkbox } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Service, { RTopic } from '../service/assignments';
import { defaultFailureCallback } from '../service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Props {
    id?: string;
}

export const TopicForm = ({ id = undefined }: Props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const now = moment().set('second', 0);
    const next = moment().add(4, 'hour').set('second', 0);
    const [initVal, setInitVal] = useState<object>({
        deadline: [now, next]
    })
    const [scoreReleased, setScoreReleased] = useState<boolean>(false);

    const isCreating = !id;
    useEffect(() => {
        if (!isCreating) {
            setLoading(true);
            Service.getTopic(id, (response) => {
                if (response.score_released)
                    setScoreReleased(response.score_released);
                setInitVal({
                    ...initVal,
                    title: response.title
                });
                setLoading(false);
            }, (err) => {
                defaultFailureCallback(err);
                setLoading(false);
            })
        }
    }, []);

    const onFinish = async (item: { title: string, deadline: moment.Moment[], score_released?: boolean }) => {
        const [start, end] = item.deadline;

        const request: RTopic = {
            title: item.title,
            start: start.toDate().toISOString(),
            end: end.toDate().toISOString(),
            score_released: false
        }

        if (start.isAfter(end)) {
            request.end = start.toDate().toISOString();
            request.start = end.toDate().toISOString();
        }

        if (!isCreating) {
            request.score_released = scoreReleased;
        }

        setLoading(true);
        if (isCreating) {
            await Service.createTopic(request, () => {
                toast.success("Topic created successfully.");
                navigate(-1);
                setLoading(false);
            }, (err) => {
                defaultFailureCallback(err);
                setLoading(false);
            });
        } else {
            console.log(request);
            await Service.updateTopic(id, request, () => {
                toast.success("Topic updated successfully.");
                navigate(-1);
                setLoading(false);
            }, (err) => {
                defaultFailureCallback(err);
                setLoading(false);
            });
        }
    }

    return (<>
        {loading && <Spin spinning={loading} tip="Loading..."><div className='h-32'></div></Spin>}
        {!loading && <Form layout="vertical" labelCol={{ span: 2 }} wrapperCol={{ span: 8 }} initialValues={initVal} onFinish={onFinish}>
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Judul topik belum diisi' }]}
            >
                <Input placeholder="Judul Topic" />
            </Form.Item>
            <Form.Item
                label="Deadline"
                name="deadline"
                rules={[
                    {
                        required: true,
                        message: 'Waktu pengerjaan topik belum diisi',
                    },
                ]}
            >
                <DatePicker.RangePicker showTime />
            </Form.Item>
            {isCreating ? (
                <Form.Item
                    label="Upload File Soal"
                    name="file-upload"
                    rules={[
                        { required: false, message: 'File soal belum di-upload!' },
                    ]}
                >
                    <Upload.Dragger name="file" multiple={false}
                        showUploadList={{ showRemoveIcon: true }}
                        accept=".xlsx,.xls,.csv"
                        customRequest={() => true}
                        onChange={(e) => {
                            e.file.status = 'done';
                            return;
                        }} >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Upload File Soal</p>
                    </Upload.Dragger>
                </Form.Item>
            ) : (
                <Form.Item>
                    <Checkbox onChange={(e) => setScoreReleased(e.target.checked)} checked={scoreReleased}>Release Score</Checkbox>
                </Form.Item>
            )}
            <Form.Item>
                <Button size="large" type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>}
    </>)
};
