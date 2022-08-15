import { PlusOutlined, InfoCircleOutlined, FormOutlined } from '@ant-design/icons';
import { Table, Button, Spin, PageHeader } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import { defaultFailureCallback } from '../../service';
import eventService, { IEvent } from '../../service/event';

export const EventList = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [queryParams, setQueryParams] = useSearchParams();


    const columns: ColumnsType<IEvent> = [
        {
            title: 'No.',
            dataIndex: 'idx',
            key: 'id',
            render: (_, record, idx) => (<>{+idx + 1 + ((page - 1) * pageSize)}</>),
        },
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
            width: 400,
            filters: [],
            onFilter: (value: any, record) => record.title.indexOf(value) === 0,
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Start',
            dataIndex: 'start',
            key: 'start',
            width: 400,
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'End',
            dataIndex: 'end',
            key: 'end',
            width: 400,
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Link to={`../event/${record.id}`}>
                        <Button
                            type="primary"
                            size="middle"
                            icon={<InfoCircleOutlined className="align-baseline" />}
                        >
                            View
                        </Button>
                    </Link>
                    <Link to={`../event/${record.id}/edit`} className="ml-2">
                        <Button
                            type="primary"
                            size="middle"
                            icon={<FormOutlined className='align-baseline' />}
                        >
                            Edit
                        </Button>
                    </Link>
                </>
            ),
        },
    ];

    useEffect(() => {
        setLoading(true);

        const queryPage = queryParams.get("page");
        if (queryPage && +queryPage) {
            setPage(+queryPage);
        }
        eventService.getEvents(page, (data) => {
            setEvents(data.events);
            setPage(data.page);
            setTotal(data.total);
            setPageSize(data.pageSize);
            setLoading(false);
        }, (err) => {
            defaultFailureCallback(err);
            setLoading(false);
        });
    }, [page]);

    return (
        <StandardLayout allowedRole={"Committee"} title={"Event List"} >
            <Spin tip="Fetching data..." spinning={loading}>
                <PageHeader title="List Event" />
                <div className='ml-3 mb-3'>
                    <Link to="create">
                        <Button
                            icon={<PlusOutlined className="align-baseline" />}
                            size="middle"
                            type="primary"
                        >
                            Create
                        </Button>
                    </Link>
                </div>
                <Table columns={columns} dataSource={events}
                    pagination={{
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
