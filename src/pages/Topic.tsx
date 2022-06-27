import { Button, Space, Table } from 'antd';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
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
        render: () => (
            <Space size="middle">
                <Button type="primary" icon={<FormOutlined />} size="large">
                    Edit
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
            <Button icon={<PlusOutlined />} size="large" type="primary">
                Create
            </Button>
        </div>
        <Table columns={columns} dataSource={data} />
    </StandardLayout>
);
