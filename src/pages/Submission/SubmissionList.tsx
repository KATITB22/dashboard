import { Table, PageHeader, Space, Button } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import { useEffect } from 'react';
import Service from '../../service/assignments';

interface DataType {
    id: number;
    submission: string;
    nim: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Submission',
        dataIndex: 'submission',
    },
    {
        title: 'NIM',
        dataIndex: 'nim',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link to={`/submissions/${record.id}`}>
                    <Button
                        type="primary"
                        icon={<FolderOpenOutlined />}
                        size="large"
                    >
                        Open
                    </Button>
                </Link>
            </Space>
        ),
    },
];

const data = [
    {
        id: 1,
        submission: 'John Brown',
        nim: '13519001',
    },
    {
        id: 2,
        submission: 'John Brown',
        nim: '13519002',
    },
    {
        id: 3,
        submission: 'John Brown',
        nim: '13519003',
    },
    {
        id: 4,
        submission: 'John Brown',
        nim: '13519004',
    },
    {
        id: 5,
        submission: 'John Brown',
        nim: '13519005',
    },
];

export const SubmissionList = () => {
    const { id } = useParams();
    if (!id) return null;
    const navigate = useNavigate();

    useEffect(() => {
        Service.getTopicSubmissions(id, 1, (response) => console.log(response), (err) => { });
    }, []);

    return (
        <StandardLayout allowedRole={["Committee", "Mentor", "Participant"]}>
            <PageHeader onBack={() => navigate(-1)} title="List Submission" />
            <Table columns={columns} dataSource={data} />
        </StandardLayout>
    );
};
