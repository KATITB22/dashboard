import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Table, Button, PageHeader } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link, useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';

interface EventData {
    id: number;
    eventName: string;
    date: string;
    startTime: string;
    endTime: string;
    method: string;
}

const dataDummy = [
    {
        id: 1,
        eventName: 'Event 1',
        date: '2020-01-01',
        startTime: '',
        endTime: '',
        method: '',
    },
    {
        id: 2,
        eventName: 'Event 2',
        date: '2020-01-02',
        startTime: '',
        endTime: '',
        method: '',
    },
    {
        id: 3,
        eventName: 'Event 3',
        date: '2020-01-03',
        startTime: '',
        endTime: '',
        method: '',
    },
    {
        id: 4,
        eventName: 'Event 4',
        date: '2020-01-04',
        startTime: '',
        endTime: '',
        method: '',
    },
    {
        id: 5,
        eventName: 'Event 5',
        date: '2020-01-05',
        startTime: '',
        endTime: '',
        method: '',
    },
    {
        id: 6,
        eventName: 'Event 6',
        date: '2020-01-06',
        startTime: '',
        endTime: '',
        method: '',
    },
];

const columns: ColumnsType<EventData> = [
    {
        title: 'Name',
        dataIndex: 'eventName',
        width: 550,
        filters: [],
        onFilter: (value: any, record) => record.eventName.indexOf(value) === 0,
        sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
        title: 'Date',
        dataIndex: 'date',
        width: 550,
        sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
        title: 'Details',
        render: (_, record) => (
            <Link to={`/event/${record.eventName}`}>
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
    return (
        <StandardLayout>
            <PageHeader onBack={() => navigate(-1)} title="List Event" />
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
            <Table columns={columns} dataSource={dataDummy} />
        </StandardLayout>
    );
};
