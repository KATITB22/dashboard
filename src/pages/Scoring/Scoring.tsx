import { useContext, useEffect, useState } from 'react';
import {
    PageHeader,
    Spin,
    Input,
    Button,
    Form,
    Card,
    Space,
    Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import { UserContext } from '../../context';
import unitService from '../../service/unit';
import { defaultFailureCallback } from '../../service';
import { toast } from 'react-toastify';

export const Scoring = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState('');

    // Unit Data
    const [unitScore, setUnitScore] = useState(0);
    const [usernameUnit, setUsernameUnit] = useState('');

    useEffect(() => {
        const getUnitScore = async () => {
            await unitService.getMyScore(
                (data) => {
                    setUnitScore(data.score);
                    setUsernameUnit(data.username);
                },
                (err) => {
                    defaultFailureCallback(err);
                }
            );
        };

        getUnitScore();

        let interval: any = null;

        if (document.hasFocus()) {
            interval = setInterval(() => {
                getUnitScore();
            }, 10000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    });

    // Participant Data
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [score, setScore] = useState('');

    const handleSearch = (e: any) => {
        setSearch(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        await unitService.findParticipant(
            search,
            (data) => {
                setName(data.name);
                setUsername(data.username);
                setScore(data.score);
            },
            (err) => {
                defaultFailureCallback(err);
            }
        );
        setLoading(false);
    };

    const handleScore = async () => {
        await unitService.updateScore(
            username,
            usernameUnit,
            10,
            (res) => {
                toast.success('Successfully give 10 points!');
            },
            (err) => defaultFailureCallback(err)
        );
    };

    return (
        <StandardLayout
            allowedRole={['SuperCommittee', 'Unit']}
            title="Scoring"
        >
            <PageHeader onBack={() => navigate(-1)} title="Scoring List" />
            <Typography.Title level={2}>
                Your Score {unitScore}
            </Typography.Title>
            <Form
                layout="vertical"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
            >
                <Form.Item
                    label="Participant's Name / Registration No."
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter participant's name / registration number",
                        },
                    ]}
                >
                    <Input
                        name="participant"
                        placeholder="Enter participants's name or registration number"
                        onChange={handleSearch}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleSubmit}
                    >
                        Search
                    </Button>
                </Form.Item>
            </Form>
            {name ? (
                <Spin tip="Finding Participant..." spinning={loading}>
                    <Card title={name} className="w-1/2">
                        <Space direction="vertical" className="w-full">
                            <div className="flex gap-8">
                                <div>
                                    <p>NIM / No. Registrasi :</p>
                                    <p>Score :</p>
                                </div>
                                <div>
                                    <p>{username}</p>
                                    <p>{score}</p>
                                </div>
                            </div>
                            <Button
                                type="primary"
                                className="w-full"
                                onClick={handleScore}
                            >
                                Give Score
                            </Button>
                        </Space>
                    </Card>
                </Spin>
            ) : (
                ''
            )}
        </StandardLayout>
    );
};
