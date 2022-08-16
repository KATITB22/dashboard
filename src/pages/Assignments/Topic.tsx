import { Alert, Button, PageHeader, Space, Spin, Table, Tag } from 'antd';
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
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { UserContext } from '../../context';
import { LastUpdateStatus } from '../../components/Assignments/LastUpdate';

interface TopicProps {
    isAdmin?: boolean;
}

export const Topic = ({ isAdmin = false }: TopicProps) => {
    const { user }: any = useContext(UserContext);
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
            return "Sekarang";
        } else if (now.isAfter(end)) {
            return "Sudah Lewat";
        } else {
            return "Akan Datang";
        }
    }

    const now = moment();
    const columns: ColumnsType<ITopic> = [
        {
            title: 'No.',
            dataIndex: 'idx',
            key: 'id',
            render: (_, record, idx) => (<>{+idx + 1 + ((page - 1) * pageSize)}</>),
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
                    "Sudah Lewat": "red",
                    "Sekarang": "green",
                    "Akan Datang": "purple",
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
                            {user.role === 'SuperCommittee' ? <Link to={`../assignment/${record.id}`}>
                                <Button type="primary" icon={<FormOutlined />} size="middle">
                                    Edit
                                </Button>
                            </Link> : <></>}
                            <Link to={`../assignment/${record.id}/submissions`}>
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
    } else {
        columns.push(
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => {
                    if (moment().isBefore(moment(record.start))) {
                        return (<Button type="primary" icon={<FormOutlined />} size="middle" disabled>
                            Open
                        </Button>)
                    }

                    return (
                        <Space size="middle" key={`action-` + record.id}>
                            <Link to={`../assignment/workspace/${record.id}`}>
                                <Button type="primary" icon={<FormOutlined />} size="middle">
                                    Open
                                </Button>
                            </Link>
                        </Space>
                    )
                },
            })
    }

    const refresh = (getPage: boolean = true) => {
        if (!document.hasFocus()) return;
        if (getPage) {
            const queryPage = queryParams.get("page");
            if (queryPage) {
                const numberedPage = +queryPage;
                setPage(Number.isNaN(numberedPage) ? 1 : numberedPage);
            }
        }

        setLastUpdate(moment().format("DD MMM YYYY HH:mm"));
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
    }, []);

    useEffect(() => { refresh(false) }, [page]);

    topics.sort((a, b) => {
        const statusA = getRecordStatus(a);
        const statusB = getRecordStatus(b);
        const mappers: { [key: string]: number } = {
            'Akan Datang': 2,
            'Sekarang': 1,
            'Sudah Lewat': 3
        }
        return mappers[statusA] - mappers[statusB];
    })

    return (
        <StandardLayout allowedRole={["SuperCommittee", "Mentor", "Participant"]} title={"Assignments"} >
            <PageHeader title='Assignments Page' />
            <Alert className='mb-5 max-w-lg' showIcon type="warning" message="Disclaimer" description="Fitur ini masih dalam pengembangan dan belum sempurna! Masih dalam tahap uji coba. Mohon maaf apabila terjadi kesalahan." closable />
            <LastUpdateStatus lastUpdate={lastUpdate} />
            {(isAdmin && user.role === 'SuperCommittee') ? <div className="mb-5">
                <Link to="../assignment/create">
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

export const TopicAdmin = () => {
    const { user }: any = useContext(UserContext);
    return <Topic isAdmin={user.role === 'SuperCommittee' || user.role === 'Mentor'} />
};