import { ClockCircleOutlined } from '@ant-design/icons';
import { Alert, Descriptions, PageHeader, Spin, Table, Timeline } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context';
import { StandardLayout } from '../layout/StandardLayout';
import { defaultFailureCallback } from '../service';
import GroupService from '../service/group';

export const Dashboard = () => {
    const { user }: any = useContext(UserContext);
    const [groupLoading, setGroupLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [members, setMembers] = useState<any[]>([]);

    useEffect(() => {
        GroupService.getMyGroup((res) => {
            const data: any[] = [];
            res.leaders.forEach((each: any) => {
                each.role = "Mentor";
                data.push(each);
            });
            res.members.forEach((each: any) => {
                each.role = "Member";
                data.push(each);
            });
            setMembers(data);
            setGroupLoading(false);
        }, (err) => defaultFailureCallback(err));
    }, [])

    const columns = [
        {
            title: 'No',
            key: 'idx',
            render: (_: any, record: any, idx: number) => <>{idx + 1 + (page - 1) * 10}</>
        },
        {
            title: 'NIM',
            dataIndex: 'username',
            key: 'nim',
        },
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
        {
            title: 'Campus',
            dataIndex: 'campus',
            key: 'campus',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
    ];

    return (
        <StandardLayout allowedRole={["Committee", "Mentor", "Participant"]}>
            <PageHeader title="KAT ITB 2022 Dashboard" />
            <div className='mt-3 flex flex-col'>
                <Alert
                    className='my-3'
                    message="Announcement"
                    description={
                        <><p>Selamat datang di Website Dashboard KAT ITB 2022! Untuk memulai bisa memilih menu disamping.</p>
                            <p>Website ini hanya digunakan untuk utilitas administrasi seperti absensi dan tugas dari pengumpulan hingga penilaian.</p></>
                    }
                    type="info"
                />
            </div>
            <PageHeader title="My Profile" />
            <Descriptions bordered>
                <Descriptions.Item label="NIM">{user.username}</Descriptions.Item>
                <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                <Descriptions.Item label="Faculty">{user.faculty}</Descriptions.Item>
                <Descriptions.Item label="Campus">{user.campus}</Descriptions.Item>
                <Descriptions.Item label="Sex">{user.sex}</Descriptions.Item>
                <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
            </Descriptions>
            <Timeline mode="alternate" className='mt-16 hidden'>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item dot={<ClockCircleOutlined />}>Solve initial network problems 2015-09-01</Timeline.Item>
                <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            </Timeline>
            <PageHeader title="My Group" />
            <div className='mt-3'>
                <Spin tip="Fetching data..." spinning={groupLoading}>
                    <Table dataSource={members} columns={columns} pagination={{ onChange: (e) => setPage(e), showSizeChanger: false }} />
                </Spin>
            </div>
        </StandardLayout>
    )
};
