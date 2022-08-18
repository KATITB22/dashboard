import { PageHeader, Spin, Table } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';

import service, { GroupMember } from '../../service/group';

export const GroupDetail = () => {
    const { id } = useParams();
    if (!id) return <></>;

    const navigate = useNavigate();
    const [members, setMembers] = useState<GroupMember[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [groupName, setGroupName] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const columns = [
        {
            title: 'No',
            key: 'idx',
            render: (_: any, record: any, idx: number) => <>{idx + 1 + (page - 1) * 10}</>
        },
        {
            title: 'NIM/No. Registrasi',
            dataIndex: 'nim',
            key: 'nim',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
    ];

    useEffect(() => {
        service.getGroupByID(id, (res) => {
            setMembers(res.leaders.concat(res.members));
            setGroupName(res.name);
            setIsLoading(false);
        });
    }, []);

    return (
        <StandardLayout allowedRole={["SuperCommittee", "Mentor"]} title={"Kelompok " + groupName} >
            <>
                <PageHeader onBack={() => navigate(-1)} title="Group Detail" />
                <Header>Kelompok {groupName}</Header>
                <Spin tip="Fetching data..." spinning={isLoading}>
                    <Table dataSource={members} columns={columns} pagination={{ onChange: (e) => setPage(e), showSizeChanger: false }} />
                </Spin>
            </>
        </StandardLayout>
    );
};
