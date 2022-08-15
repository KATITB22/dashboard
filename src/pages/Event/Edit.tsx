import { useState, useEffect } from 'react';
import moment from 'moment';
import { DatePickerProps, PageHeader } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input, DatePicker, Select, Spin } from 'antd';
import eventService from '../../service/event';
import { defaultFailureCallback } from '../../service';
import { StandardLayout } from '../../layout/StandardLayout';
import { toast } from 'react-toastify';

export const EditEvent = () => {
    const { id } = useParams();
    if (!id) return <></>;

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [attendanceStart, setAttendanceStart] = useState('');
    const [attendanceEnd, setAttendanceEnd] = useState('');
    const [attendanceType, setAttendanceType] = useState('');
    const [empty, setEmpty] = useState(true);

    const fetchData = async () => {
        await eventService.getEventById(
            id,
            (res) => {
                setTitle(res.title);
                setAttendanceStart(res.attendance_start);
                setAttendanceEnd(res.attendance_end);
                setAttendanceType(res.attendance_type);
                setEmpty(false);
            },
            (err) => {
                defaultFailureCallback(err);
                setEmpty(false);
            }
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEventNameChange = (e: any) => {
        setTitle(e.target.value);
    };

    const handleAttendanceStartChange = (
        _: DatePickerProps['value'],
        dateString: string
    ) => {
        setAttendanceStart(dateString);
    };

    const handleAttendanceEndChange = (
        _: DatePickerProps['value'],
        dateString: string
    ) => {
        setAttendanceEnd(dateString);
    };

    const handleAttendanceTypeChange = (value: string) => {
        setAttendanceType(value);
    };

    const handleSubmit = async () => {
        const data = {
            title,
            attendance_start: new Date(attendanceStart).toISOString(),
            attendance_end: new Date(attendanceEnd).toISOString(),
            attendance_type: attendanceType,
        };
        await eventService.updateEvent(
            id,
            data,
            (res) => toast.success("Successfully update event!"),
            (err) => defaultFailureCallback(err)
        );
        navigate(`/event/${id}`);
    };

    return (
        <StandardLayout allowedRole={"Committee"} title={"Edit Event"} >
            <PageHeader onBack={() => navigate(-1)} title="Edit Event" />
            {empty ? (
                <Spin tip="Loading..." />
            ) : (
                <Form
                    layout="vertical"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 8 }}
                    initialValues={{
                        title,
                        attendance_start: moment(attendanceStart),
                        attendance_end: moment(attendanceEnd),
                        attendance_type: attendanceType,
                    }}
                >
                    <Form.Item
                        label="Event Name"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the event name!',
                            },
                        ]}
                    >
                        <Input
                            name="eventName"
                            onChange={handleEventNameChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Attendance Start"
                        name="attendance_start"
                        rules={[
                            {
                                required: true,
                                message: 'Please input attendance start time!',
                            },
                        ]}
                    >
                        <DatePicker
                            showTime
                            style={{ width: '100%' }}
                            onChange={handleAttendanceStartChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Attendance End"
                        name="attendance_end"
                        rules={[
                            {
                                required: true,
                                message: 'Please input attendance end time!',
                            },
                        ]}
                    >
                        <DatePicker
                            showTime
                            style={{ width: '100%' }}
                            onChange={handleAttendanceEndChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Attendance Type"
                        name="attendance_type"
                        rules={[
                            {
                                required: true,
                                message: 'Please pick attendance type!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Pick a method"
                            onChange={handleAttendanceTypeChange}
                        >
                            <Select.Option value="GroupLeader">
                                Group Presence
                            </Select.Option>
                            <Select.Option value="Self">
                                Self Presence
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            onClick={handleSubmit}
                            type="primary"
                            style={{ marginRight: 10 }}
                        >
                            Save
                        </Button>
                        <Button type="ghost" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </StandardLayout>
    );
};
