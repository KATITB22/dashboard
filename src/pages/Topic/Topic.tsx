import { Button, Pagination, Space, Spin, Table } from 'antd';
import {
    PlusOutlined,
    FormOutlined,
    ContainerOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { Link, useSearchParams } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import Service, { ITopic } from '../../service/assignments';
import { defaultFailureCallback } from '../../service';
import { useEffect, useState } from 'react';

const columns: ColumnsType<ITopic> = [
    {
        title: 'No.',
        dataIndex: 'idx',
        key: 'id',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'name',
    },
    {
        title: 'Start',
        dataIndex: 'start',
        key: 'start',
    },
    {
        title: 'End',
        dataIndex: 'end',
        key: 'end',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle" key={`action-` + record.id}>
                <Link to={`${record.id}`}>
                    <Button type="primary" icon={<FormOutlined />} size="large">
                        Edit
                    </Button>
                </Link>
                <Link to={`${record.id}/submissions`}>
                    <Button
                        type="primary"
                        icon={<ContainerOutlined />}
                        size="large"
                    >
                        Submissions
                    </Button>
                </Link>
            </Space>
        ),
    },
];

export const Topic = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [topics, setTopics] = useState<ITopic[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [queryParams, setQueryParams] = useSearchParams();

    useEffect(() => {
        const queryPage = queryParams.get("page");
        if (queryPage && +queryPage) {
            setPage(+queryPage);
        }
        setLoading(true);
        Service.getTopics(page, (data) => {
            setTopics(data.topics);
            setTotal(data.total);
            setPage(data.page);
            setPageSize(data.pageSize);
            setLoading(false);
        }, (err) => {
            defaultFailureCallback(err);
            setLoading(false);
        });
    }, [page]);

    return (
        <StandardLayout>
            <div className="mb-5">
                <Link to="create">
                    <Button icon={<PlusOutlined />} size="large" type="primary">
                        Create
                    </Button>
                </Link>
            </div>
            <Spin tip="Fetching data..." spinning={loading}>
                <Table columns={columns} dataSource={topics} pagination={{
                    total, current: page, pageSize, showSizeChanger: false, onChange: (e) => {
                        queryParams.set("page", e.toString());
                        setQueryParams(queryParams);
                        setPage(e);
                    }
                }} />
            </Spin>
        </StandardLayout>
    );
};
