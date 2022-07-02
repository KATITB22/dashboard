import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Table, Button, Spin, PageHeader } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import { defaultFailureCallback } from '../../service';
import eventService, { IEvent } from '../../service/event';

const columns: ColumnsType<IEvent> = [
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
        title: 'Details',
        key: 'details',
        render: (_, record) => (
            <Link to={`/event/${record.id}`}>
                <Button
                    type="primary"
                    size="large"
                    icon={<InfoCircleOutlined className="align-baseline" />}
                >
                    Details
                </Button>
            </Link>
        ),
    },
];

export const EventList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        setLoading(true);
        eventService.getEvents((data) => {
            setEvents(data.events);
            setLoading(false);
        }, (err) => {
            defaultFailureCallback(err);
            setLoading(false);
        });
    }, []);

    return (
        <StandardLayout>
            <div className="mb-5">
                <Link to="create">
                    <Button
                        icon={<PlusOutlined className="align-baseline" />}
                        size="large"
                        type="primary"
                    >
                        Create
                    </Button>
                </Link>
            </div>
            
            <Spin tip="Fetching data..." spinning={loading}>
                <PageHeader onBack={() => navigate(-1)} title="List Event" />
                <Table columns={columns} dataSource={events} />
            </Spin>
        </StandardLayout>
    );
};
