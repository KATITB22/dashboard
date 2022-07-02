import { PageHeader, Spin, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';

import service, { GroupMember } from '../../service/group';

export const GroupDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [members, setMembers] = useState<GroupMember[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const dataSource = [
    //     {
    //         key: '1',
    //         name: 'Aira',
    //         faculty: 'STEI',
    //         campus: 'Ganesha',
    //     },
    //     {
    //         key: '2',
    //         name: 'Kinan',
    //         faculty: 'STEI',
    //         campus: 'Ganesha',
    //     },
    // ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        // {
        //     title: 'Faculty',
        //     dataIndex: 'faculty',
        //     key: 'faculty',
        // },
        // {
        //     title: 'Campus',
        //     dataIndex: 'campus',
        //     key: 'campus',
        // },
    ];

    useEffect(() => {
        service.getGroupByID(id, (res) => {
            setMembers(res.members);
            setIsLoading(false);
        });
    }, []);

    return (
        <StandardLayout>
            <>
                <PageHeader onBack={() => navigate(-1)} title="Group Detail" />
                <Spin tip="Fetching data..." spinning={isLoading}>
                    <Table dataSource={members} columns={columns} />
                </Spin>
            </>
        </StandardLayout>
    );
};
