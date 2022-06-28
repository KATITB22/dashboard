import { Table, PageHeader, Space, Button } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { useNavigate, Link } from 'react-router-dom';
import { StandardLayout } from '../layout/StandardLayout';

interface DataType {
    id: number;
    submission: string;
    nim: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Submission',
        dataIndex: 'submission',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Jim',
                value: 'Jim',
            },
        ],
        onFilter: (value: any, record) =>
            record.submission.indexOf(value) === 0,
        sorter: (a, b) => a.submission.localeCompare(b.submission),
        sortDirections: ['descend'],
    },
    {
        title: 'NIM',
        dataIndex: 'nim',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        onFilter: (value: any, record) => record.nim.indexOf(value) === 0,
        sorter: (a, b) => a.nim.localeCompare(b.nim),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link to={`${record.id}`}>
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
    const navigate = useNavigate();

    return (
        <StandardLayout>
            <PageHeader onBack={() => navigate(-1)} title="List Submission" />
            <Table columns={columns} dataSource={data} />
        </StandardLayout>
    );
};
