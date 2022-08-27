import { useContext, useEffect, useState } from 'react';
import { PageHeader, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import { StandardLayout } from '../../layout/StandardLayout';
import unitService from '../../service/unit';
import { defaultFailureCallback } from '../../service';
import { toast } from 'react-toastify';

export const LiveStatus = () => {
    const { user }: any = useContext(UserContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [isLive, setIsLive] = useState<boolean>(false);
    const [name, setName] = useState('');

    useEffect(() => {
        const getIsLive = async () => {
            await unitService.getLiveStatus(
                user.name,
                (data) => {
                    setName(data.name);
                    setIsLive(data.isLive);
                },
                (err) => {
                    defaultFailureCallback(err);
                }
            );
        };

        getIsLive();

        let interval: any = null;

        if (document.hasFocus()) {
            interval = setInterval(() => {
                getIsLive();
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, []);

    const handleLive = async () => {
        await unitService.updateLiveStatus(
            user.name,
            !isLive,
            (res) => {
                toast.success(
                    `You are now ${res.isLive ? 'Live' : 'Not Live'}`
                );
            },
            (err) => {
                defaultFailureCallback(err);
            }
        );
    };

    return (
        <StandardLayout
            allowedRole={['SuperCommittee', 'Unit']}
            title="Live Status"
        >
            <PageHeader onBack={() => navigate(-1)} title="Live Status" />
            <Typography.Title level={2}>
                {name} is now {isLive ? 'Live' : 'Not Live'}
            </Typography.Title>
            <Button type="primary" onClick={handleLive}>
                Toggle {isLive ? 'Not Live' : 'Live'}
            </Button>
        </StandardLayout>
    );
};
