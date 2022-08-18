import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, PageHeader, Input, Button, Spin, Table } from 'antd';
import { StandardLayout } from '../../layout/StandardLayout';
import { UserContext } from '../../context';
import { defaultFailureCallback } from '../../service';
import GroupService from '../../service/group';

export const Profile = () => {
    const navigate = useNavigate();
    const { user }: any = useContext(UserContext);
    const [groupLoading, setGroupLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [members, setMembers] = useState<any[]>([]);
    const [isCommittee, setIsCommittee] = useState<boolean>(false);
    const nonMember = ["SuperCommittee", "Committee", "Unit"];

    useEffect(() => {
        setIsCommittee(nonMember.includes(user.role));
        if (!isCommittee)
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
    }, []);

    const columns = [
        {
            title: 'No',
            key: 'idx',
            render: (_: any, record: any, idx: number) => <>{idx + 1 + (page - 1) * 10}</>
        },
        {
            title: 'NIM/No. Registrasi',
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
        <StandardLayout allowedRole={["SuperCommittee", "Committee", "Participant", "Mentor", "Unit"]} title={"Profile"} >
            <PageHeader title="Profile" />
            <Form
                layout="vertical"
                disabled={true}
                wrapperCol={{ span: 8 }}
            >
                <Form.Item
                    label="Nama"
                >
                    <Input placeholder={user.name} />
                </Form.Item>
                <Form.Item
                    label="NIM/No. Registrasi"
                >
                    <Input placeholder={user.username} />
                </Form.Item>
                <Form.Item
                    label="Faculty"
                >
                    <Input placeholder={user.faculty} />
                </Form.Item>
                <Form.Item
                    label="Campus"
                >
                    <Input placeholder={user.campus} />
                </Form.Item>
                <Form.Item
                    label="Gender"
                >
                    <Input placeholder={user.sex} />
                </Form.Item>
                <Form.Item
                    label="Password"
                >
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item
                    label="New Password"
                >
                    <Input placeholder="" />
                </Form.Item>
            </Form>
            <Button type="primary"
                onClick={() => navigate("/profile/edit")}
            >
                Edit Profile
            </Button>
            {!isCommittee ? <>
                <PageHeader title="My Group" />
                <div className='mt-3'>
                    <Spin tip="Fetching data..." spinning={groupLoading}>
                        <Table dataSource={members} columns={columns} pagination={{ onChange: (e) => setPage(e), showSizeChanger: false }} />
                    </Spin>
                </div>
            </> : <></>}
        </StandardLayout>
    );
};
