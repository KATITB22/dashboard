import { PageHeader, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';

export const GroupDetail = () => {
    const navigate = useNavigate();
    const dataSource = [
        {
            key: '1',
            name: 'Aira',
            faculty: 'STEI',
        },
        {
            key: '2',
            name: 'Kinan',
            faculty: 'STEI',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Faculty',
            dataIndex: 'faculty',
            key: 'faculty',
        },
    ];
    return (
        <StandardLayout>
            <>
                <PageHeader onBack={() => navigate(-1)} title="Group Detail" />
                <Table dataSource={dataSource} columns={columns} />
            </>
        </StandardLayout>
    );
};
