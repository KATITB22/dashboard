import { Button, Form, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { StandardLayout } from '../../layout/StandardLayout';
import samitraService from '../../service/samitra';

interface BanData {
    identifier: string;
}

interface BanListResponse {
    id: number;
    identifier: string;
}

export const SamitraBans = () => {
    const [form] = Form.useForm();
    const [bansData, setBansData] = useState<BanData[]>([]);

    const tableColumns = [
        {
            title: 'Username',
            dataIndex: 'identifier',
            name: 'identifier',
        },
    ];

    const getBannedList = async () => {
        const res = (await samitraService.getBanList()) as BanListResponse[];
        if (res) {
            setBansData(() => [...res]);
        }
    };

    const handleBan = async ({ username }: { username: string }) => {
        form.resetFields();
        try {
            const res = await samitraService.submitBan(username);
            if (!res) throw new Error('Unable to get ban');
            getBannedList();
            toast.success(`Sucessfully banned ${username}`);
        } catch (error) {
            console.error(error);
            toast.error('Failed to submit ban');
        }
    };

    useEffect(() => {
        getBannedList();
    }, []);

    return (
        <StandardLayout allowedRole="Committee" title="Samitra Ban">
            <Form
                form={form}
                layout="horizontal"
                wrapperCol={{ span: 10 }}
                onFinish={handleBan}
            >
                <Form.Item label="NIM/Nomor registrasi" name="username">
                    <Input placeholder="Input NIM/Nomor registrasi" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Ban
                    </Button>
                </Form.Item>
            </Form>

            <Table dataSource={bansData} columns={tableColumns} />
        </StandardLayout>
    );
};
