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
    const [score, setScore] = useState(0);

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
            }, 3000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    });

    // Participant Data
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [giveScore, setGiveScore] = useState(0);

    const handleGiveScore = (e: any) => {
        setGiveScore(e.target.value);
    };

    const handleSearch = (e: any) => {
        setSearch(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!search) {
            setLoading(false);
            toast.warning('Enter the search box');
            return;
        }
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
        if (!giveScore) {
            toast.warning('Enter a score to give');
            return;
        }
        await unitService.updateScore(
            username,
            usernameUnit,
            Number(giveScore),
            (res) => {
                toast.success(`Successfully give ${giveScore} points!`);
            },
            (err) => defaultFailureCallback(err)
        );
    };

    return (
        <StandardLayout
            allowedRole={['SuperCommittee', 'Unit']}
            title="Scoring"
        >
            <>
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
                {name && (
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
                                <Form>
                                    <Form.Item rules={[{ required: true }]}>
                                        <Input
                                            placeholder="Masukkan jumlah poin"
                                            name="poin"
                                            onChange={handleGiveScore}
                                            type="number"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            className="w-full"
                                            onClick={handleScore}
                                        >
                                            Give Score
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Space>
                        </Card>
                    </Spin>
                )}
            </>
        </StandardLayout>
    );
};
