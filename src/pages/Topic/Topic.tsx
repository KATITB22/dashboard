import { Button, PageHeader, Pagination, Space, Spin, Table, Tag } from 'antd';
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
import moment from 'moment';

interface TopicProps {
    isAdmin?: boolean;
}

export const Topic = ({ isAdmin = false }: TopicProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [topics, setTopics] = useState<ITopic[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [queryParams, setQueryParams] = useSearchParams();

    const getRecordStatus = (record: ITopic) => {
        const start = moment(record.start);
        const end = moment(record.end);
        if (now.isBetween(start, end)) {
            return "Current";
        } else if (now.isAfter(end)) {
            return "Past";
        } else {
            return "Incoming";
        }
    }

    const now = moment();
    const columns: ColumnsType<ITopic> = [
        {
            title: 'No.',
            dataIndex: 'idx',
            key: 'id',
            render: (_, record, idx) => (<>{+idx + 1}</>),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'name',
            render: (_, record) => {
                var status = getRecordStatus(record);
                const colorMappers: { [key: string]: string } = {
                    "Past": "red",
                    "Current": "green",
                    "Incoming": "purple",
                    "Unknown": "yellow"
                }
                return (<span>{record.title}<Tag className='ml-3' color={colorMappers[status]}>{status}</Tag></span>)
            }
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
            render: (_, record) => {
                if (!isAdmin) {
                    return <Space size="middle" key={`action-` + record.id}>
                    </Space>
                }
                return (
                    <Space size="middle" key={`action-` + record.id}>
                        <Link to={`../topic/${record.id}`}>
                            <Button type="primary" icon={<FormOutlined />} size="large">
                                Edit
                            </Button>
                        </Link>
                        <Link to={`../topic/${record.id}/submissions`}>
                            <Button
                                type="primary"
                                icon={<ContainerOutlined />}
                                size="large"
                            >
                                Submissions
                            </Button>
                        </Link>
                    </Space>
                )
            },
        },
    ];

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

    topics.sort((a, b) => {
        const statusA = getRecordStatus(a);
        const statusB = getRecordStatus(b);
        const mappers: { [key: string]: number } = {
            'Incoming': 2,
            'Current': 1,
            'Past': 3
        }
        return mappers[statusA] - mappers[statusB];
    })

    return (
        <StandardLayout>
            <PageHeader title={(isAdmin) ? 'Admin Assignments Page' : 'Assignments'} />
            <div className='mb-3'>Current Time: {now.format("DD MMM YYYY HH:mm:ss")}</div>
            {(isAdmin) ? <div className="mb-5">
                <Link to="create">
                    <Button icon={<PlusOutlined />} size="large" type="primary">
                        Create
                    </Button>
                </Link>
            </div> : <></>}
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

export const TopicAdmin = () => <Topic isAdmin={true} />