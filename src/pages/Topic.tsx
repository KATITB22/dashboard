import { Button, Space, Table } from 'antd';
import {
    PlusOutlined,
    FormOutlined,
    ContainerOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { StandardLayout } from '../layout/StandardLayout';

interface TopicData {
    id: number;
    name: string;
}

const columns: ColumnsType<TopicData> = [
    {
        title: 'No.',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Nama Topic',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link to={`${record.id}`}>
                    <Button type="primary" icon={<FormOutlined />} size="large">
                        Edit
                    </Button>
                </Link>
                <Button
                    type="primary"
                    icon={<ContainerOutlined />}
                    size="large"
                    className="bg-red-600 hover:bg-red-500"
                >
                    Submissions
                </Button>
            </Space>
        ),
    },
];

const data: TopicData[] = [
    {
        id: 1,
        name: 'Topic 1',
    },
    {
        id: 2,
        name: 'Topic 2',
    },
];

export const Topic = () => (
    <StandardLayout>
        <div className="mb-5">
            <Link to="create">
                <Button icon={<PlusOutlined />} size="large" type="primary">
                    Create
                </Button>
            </Link>
        </div>
        <Table columns={columns} dataSource={data} />
    </StandardLayout>
);
