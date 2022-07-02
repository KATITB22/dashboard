import { Button, PageHeader, Space, Spin, Table, Tag } from 'antd';
import {
    PlusOutlined,
    FormOutlined,
    ContainerOutlined,
    FolderOpenOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import Service, { ITopic } from '../../service/assignments';
import { defaultFailureCallback } from '../../service';
import { useEffect, useState } from 'react';
import moment from 'moment';

interface TopicProps {
    isAdmin?: boolean;
}

export const Topic = ({ isAdmin = false }: TopicProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [topics, setTopics] = useState<ITopic[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [queryParams, setQueryParams] = useSearchParams();
    const [lastUpdate, setLastUpdate] = useState<string>("");

    const getRecordStatus = (record: ITopic) => {
        const start = moment(record.start);
        const end = moment(record.end);
        if (now.isBetween(start, end)) {
            return "Current";
        } else if (now.isAfter(end)) {
            return "Past";
        } else {
            return "Upcoming";
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
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => {
                var status = getRecordStatus(record);
                const colorMappers: { [key: string]: string } = {
                    "Past": "red",
                    "Current": "green",
                    "Upcoming": "purple",
                    "Unknown": "yellow"
                }
                return (<Tag className='align-center' color={colorMappers[status]}>{status}</Tag>)
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
    ];
    if (isAdmin) {
        columns.push(
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => {
                    return (
                        <Space size="middle" key={`action-` + record.id}>
                            <Link to={`../assignments/${record.id}`}>
                                <Button type="primary" icon={<FormOutlined />} size="middle">
                                    Edit
                                </Button>
                            </Link>
                            <Link to={`../assignments/${record.id}/submissions`}>
                                <Button
                                    type="primary"
                                    icon={<ContainerOutlined />}
                                    size="middle"
                                >
                                    Submissions
                                </Button>
                            </Link>
                        </Space>
                    )
                },
            })
    }

    const refresh = () => {
        setLastUpdate(moment().format("DD MMM YYYY HH:mm"));
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
    }

    useEffect(() => {
        refresh();
        const worker = setInterval(() => refresh(), 30000);
        return () => {
            clearInterval(worker);
        }
    }, [page]);

    topics.sort((a, b) => {
        const statusA = getRecordStatus(a);
        const statusB = getRecordStatus(b);
        const mappers: { [key: string]: number } = {
            'Upcoming': 2,
            'Current': 1,
            'Past': 3
        }
        return mappers[statusA] - mappers[statusB];
    })

    return (
        <StandardLayout>
            <PageHeader title={(isAdmin) ? 'Admin Assignments Page' : 'Assignments'} />
            <div className='mb-3'>Last Update: {lastUpdate} WIB</div>
            {(isAdmin) ? <div className="mb-5">
                <Link to="../assignments/create">
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
                }} onRow={(record) => {
                    if (isAdmin) return {};
                    return {
                        onClick: () => { navigate(`../assignments/workspace/${record.id}`) }
                    };
                }} />
            </Spin>
        </StandardLayout>
    );
};

export const TopicAdmin = () => <Topic isAdmin={true} />