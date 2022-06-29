import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';

export const EventList = () => {
    const dataDummy = [
        {
            id: 1,
            eventName: 'sahfjkashfkjahskfa',
            date: '',
            startTime: '',
            endTime: '',
            method: '',
        },
        {
            id: 2,
            eventName: 'ajdghjkasgdmnabscx',
            date: '',
            startTime: '',
            endTime: '',
            method: '',
        },
        {
            id: 3,
            eventName: 'ajsdyaukedbakbjsdsa',
            date: '',
            startTime: '',
            endTime: '',
            method: '',
        },
        {
            id: 4,
            eventName: 'asdgasjkdasjkhdkas',
            date: '',
            startTime: '',
            endTime: '',
            method: '',
        },
        {
            id: 5,
            eventName: 'qweuqyaslkdhlakj',
            date: '',
            startTime: '',
            endTime: '',
            method: '',
        },
        {
            id: 6,
            eventName: 'msbdabmdasbduasgdajs',
            date: '',
            startTime: '',
            endTime: '',
            method: '',
        },
        {
            id: 7,
            eventName: 'zxciuozxucioahdams',
            date: '',
            startTime: '',
            endTime: '',
            method: '',
        },
        {
            id: 8,
            eventName: 'adjkash jkasdsadnal adsa',
            date: '',
            startTime: '',
            endTime: '',
            method: '',
        },
        {
            id: 9,
            eventName: 'jsdajkashjkdh asdhasklj',
            date: '',
            startTime: '',
            endTime: '',
            method: '',
        },
        {
            id: 10,
            eventName: 'adas fahsudhafskjdh',
            date: '',
            startTime: '',
            endTime: '',
            method: '',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'eventName',
            width: 550,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            width: 550,
        },
        {
            title: 'Details',
            render: (_: any, record: { id: any }) => (
                <Link to={`/event/${record.id}`}>
                    <Button
                        type="primary"
                        size="large"
                        icon={<InfoCircleOutlined className="align-baseline" />}
                        className="bg-blue-500 hover:bg-blue-350"
                    >
                        Details
                    </Button>
                </Link>
            ),
        },
    ];

    return (
        <StandardLayout>
            <div className="mb-5">
                <Link to="create">
                    <Button
                        icon={<PlusOutlined className="align-baseline" />}
                        size="large"
                        type="primary"
                        className="bg-blue-500 hover:bg-blue-350"
                    >
                        Create
                    </Button>
                </Link>
            </div>
            <div>
                <h1 className="font-bold mb-3">List Event</h1>
                <Table
                    columns={columns}
                    dataSource={dataDummy}
                    pagination={{
                        pageSize: 5,
                    }}
                    scroll={{
                        y: 1000,
                    }}
                />
            </div>
        </StandardLayout>
    );
};
