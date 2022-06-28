import { Table, PageHeader } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useNavigate } from 'react-router-dom';
import { StandardLayout } from '../layout/StandardLayout';

interface DataType {
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
];

const data = [
    {
        submission: 'John Brown',
        nim: '13519001',
    },
    {
        submission: 'John Brown',
        nim: '13519002',
    },
    {
        submission: 'John Brown',
        nim: '13519003',
    },
    {
        submission: 'John Brown',
        nim: '13519004',
    },
    {
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
