import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select, PageHeader } from 'antd';
import { StandardLayout } from '../../layout/StandardLayout';
import { toast } from 'react-toastify';
import ProfileService from '../../service/profile';
import { defaultFailureCallback } from '../../service';
import { UserContext } from '../../context';

const faculty = [
    "FITB",
    "FMIPA",
    "FSRD",
    "FTI",
    "FTMD",
    "FTSL",
    "FTTM",
    "FTTM-C",
    "SAPPK",
    "SBM",
    "SF",
    "SITH",
    "SITH-R",
    "SITH-S",
    "STEI",
    "STEI-K",
    "STEI-R",
    "-"
]

const campus = [
    "Ganesha",
    "Jatinangor",
    "Cirebon",
    "-",
]

const gender = [
    "Male",
    "Female",
    "Unknown",
]

export const EditProfile = () => {
    const navigate = useNavigate();
    const { user, setUser }: any = useContext(UserContext);
    const [data, setData] = useState({
        campus: user.campus,
        sex: user.sex,
        faculty: user.faculty,
        password: '',
        new_password: '',
        confirmpassword: '',
    });

    const handleEventFacultyChange = (val: string) => {
        setData({
            ...data,
            faculty: val,
        });
    };

    const handleEventCampusChange = (val: string) => {
        setData({
            ...data,
            campus: val,
        });
    };

    const handleEventSexChange = (val: string) => {
        setData({
            ...data,
            sex: val,
        });
    };

    const handleCurrentPassChange = (e: any) => {
        setData({
            ...data,
            password: e.target.value,
        })
    }

    const handleEventPasswordChange = (e: any) => {
        setData({
            ...data,
            new_password: e.target.value,
        });
    };

    const handleEventConfirmPasswordChange = (e: any) => {
        setData({
            ...data,
            confirmpassword: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (data.new_password.length > 0 || data.confirmpassword.length > 0) {
            if (data.new_password !== data.confirmpassword) {
                toast.error("New Password and Confirm Password doesn't match");
                return;
            } else if (data.new_password.length < 6) {
                toast.error("New Password must be at least 6 characters");
                return;
            } else if (data.password.length === 0) {
                toast.error("Please fill your current password");
                return;
            }
        }
        
        await ProfileService.updateProfile(data,
            (res) => {
                toast.success("Successfully updated profile");
                setUser({
                    ...user,
                    faculty: res.faculty,
                    campus: res.campus,
                    sex: res.sex,
                });
                navigate('/profile');
            },
            (err) => {
                defaultFailureCallback(err)
            }
        )
    };

    return (
        <StandardLayout allowedRole={["SuperCommittee", "Committee", "Mentor", "Participant"]} title={"Edit Profile"} >
            <PageHeader onBack={() => navigate(-1)} title="Edit Profile" />
            <Form
                layout="vertical"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 8 }}
            >
                <Form.Item
                    label="Faculty"
                    name="faculty-name"
                    rules={[
                        {
                            required: true,
                            message: 'Please pick your faculty!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Pick a faculty"
                        defaultValue={data.faculty}
                        onChange={handleEventFacultyChange}
                    >
                        {faculty.map((item) => {
                            return (
                                <Select.Option value={item}>
                                    {item}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Campus"
                    name="Campus-name"
                    rules={[
                        {
                            required: true,
                            message: 'Please pick your campus!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Pick a campus"
                        defaultValue={data.campus}
                        onChange={handleEventCampusChange}
                    >
                        {campus.map((item) => {
                            return (
                                <Select.Option value={item}>
                                    {item}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="Gender-name"
                    rules={[
                        {
                            required: true,
                            message: 'Please pick your gender!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Pick a gender"
                        defaultValue={data.sex}
                        onChange={handleEventSexChange}
                    >
                        {gender.map((item) => {
                            return (
                                <Select.Option value={item}>
                                    {item}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Current Password"
                    name="password-current"
                >
                    <Input
                        name="passwordcurrent"
                        type="password"
                        onChange={handleCurrentPassChange}
                        placeholder="Current Password"
                    />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password-change"
                >
                    <Input
                        name="password"
                        type="password"
                        onChange={handleEventPasswordChange}
                        placeholder="New Password"
                    />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="password-confirm"
                >
                    <Input
                        name="confirmpassword"
                        type="password"
                        onChange={handleEventConfirmPasswordChange}
                        placeholder="Confirm New Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </StandardLayout>
    );
};
