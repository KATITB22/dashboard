import { useState, useEffect } from 'react';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input, PageHeader, Spin } from 'antd';
import eventService from '../../service/event';
import { defaultFailureCallback } from '../../service';
import { StandardLayout } from '../../layout/StandardLayout';
import { toast } from 'react-toastify';

export const EventDetail = () => {
    const { id } = useParams();
    if (!id) return <></>;

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [attendanceStart, setAttendanceStart] = useState('');
    const [attendanceEnd, setAttendanceEnd] = useState('');
    const [attendanceType, setAttendanceType] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        await eventService.getEventById(
            id,
            (res) => {
                setTitle(res.title);
                setAttendanceStart(res.attendance_start);
                setAttendanceEnd(res.attendance_end);
                setAttendanceType(res.attendance_type);
                setLoading(false);
            },
            (err) => {
                defaultFailureCallback(err);
                setLoading(false);
            }
        );
    };

    const handleDeleteEvent = async () => {
        await eventService.deleteEvent(
            id,
            (res) => toast.success("Successfully delete event!"),
            (err) => defaultFailureCallback(err)
        );
        navigate('/event');
    };

    const convertToDateTime = (isoString: string) => {
        const date = moment(isoString);
        const dateComponent = date.format('DD MMM YY');
        const timeComponent = date.format('HH:mm:ss');

        return `${dateComponent} ${timeComponent}`;
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <StandardLayout allowedRole={"Committee"} title={"Event Detail"} >
            <PageHeader onBack={() => navigate(-1)} title="Event Detail" />
            {loading ? (
                <Spin tip="Loading..." />
            ) : (
                <Form
                    layout="vertical"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 8 }}
                    initialValues={{
                        title,
                        attendance_start: convertToDateTime(attendanceStart),
                        attendance_end: convertToDateTime(attendanceEnd),
                        attendance_type: attendanceType,
                    }}
                >
                    <Form.Item label="Event Name" name="title">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Attendance Start" name="attendance_start">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Attendance End" name="attendance_end">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Attendance Type" name="attendance_type">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            style={{ marginRight: 10 }}
                            onClick={() => navigate(`/event/${id}/edit`)}
                        >
                            Edit
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={handleDeleteEvent}
                        >
                            Delete
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </StandardLayout>
    );
};
