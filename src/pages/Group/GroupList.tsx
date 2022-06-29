import { PageHeader, Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';

export const GroupList = () => {
    const navigate = useNavigate();

    // interface GroupType {
    //     key: string;
    //     name: string;
    //     description: string;
    // }

    const dataSource = [
        {
            key: '1',
            name: 'Group 1',
            description: 'Description',
        },
        {
            key: '2',
            name: 'Group 2',
            description: 'description',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <Link to="/groups/1">{text}</Link>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    return (
        <StandardLayout>
            <>
                <PageHeader onBack={() => navigate(-1)} title="Group List" />
                <Table dataSource={dataSource} columns={columns} />
            </>
        </StandardLayout>
    );
};
