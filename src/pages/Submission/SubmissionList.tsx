import { Table, PageHeader, Space, Button, Spin, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, FolderOpenOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { useNavigate, Link, useParams, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { StandardLayout } from '../../layout/StandardLayout';
import Service from '../../service/assignments';
import { defaultFailureCallback } from '../../service';
import { LastUpdateStatus } from '../../components/Assignments/LastUpdate';
import { UserContext } from '../../context';
import { uniq } from 'lodash';

interface SubmissionListProps {
    isAdmin?: boolean;
}

export const SubmissionList = ({ isAdmin }: SubmissionListProps) => {
    const { user }: any = useContext(UserContext);
    if (user.role === 'SuperCommittee') {
        isAdmin = true;
    } else if (user.role === 'Mentor') {
        isAdmin = false;
    } else {
        return <></>;
    }
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [queryParams, setQueryParams] = useSearchParams();
    const queryPage = queryParams.get('page');
    let currPage = 1;
    if (queryPage) {
        const numberedPage = +queryPage;
        currPage = Number.isNaN(numberedPage) ? 1 : numberedPage;
    }
    const [page, setPage] = useState<number>(currPage);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [lastUpdate, setLastUpdate] = useState<string>('');
    const [data, setData] = useState<any[]>([]);
    if (!id) return null;
    const navigate = useNavigate();

    const refresh = () => {
        if (!document.hasFocus()) return;

        setLastUpdate(moment().format('DD MMM YYYY HH:mm'));
        setLoading(true);
        let fn = Service.getTopicSubmissionsMyGroup;
        if (isAdmin) {
            fn = Service.getTopicSubmissions;
        }
        fn(id, page, (data) => {
            setData(data.entries);
            setTotal(data.total);
            setPage(data.page);
            setPageSize(data.pageSize);
            setLoading(false);
        }, (err) => {
            defaultFailureCallback(err);
            setLoading(false);
        });
    };

    useEffect(() => {
        refresh();
        const worker = setInterval(() => refresh(), 30000);
        return () => {
            clearInterval(worker);
        };
    }, []);

    useEffect(() => { refresh();}, [page]);
    const group = data.map((d) => d.group);
    const unique = [...new Set(group)];
    const newUnique = unique.map(val => ({text: val,value: val}));
    const columns: ColumnsType<any> = [
        {
            title: 'No.',
            dataIndex: 'idx',
            key: 'id',
            render: (_, record, idx) => (<>{+idx + 1 + ((page - 1) * pageSize)}</>),
        },
        {
            title: 'NIM/No. Registrasi',
            key: 'nim',
            dataIndex: 'username',
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Group',
            key: 'group',
            dataIndex: 'group',
            filters: newUnique,
            onFilter: (value, record) => record.group === value,

        },
        {
            title: 'Checked',
            key: 'checked',
            render: (_, record: any) => {
                if (record.has_been_checked) {
                    return <Tag color='green' icon={<CheckCircleOutlined />}>Sudah dinilai</Tag>;
                } 
                return <Tag color='red' icon={<CloseCircleOutlined />}>Belum dinilai</Tag>;
            },
        },
        {
            title: 'Submit Time',
            key: 'submit-time',
            render: (_, record: any) => <>{moment(record.submit_time).format('DD MMM YY HH:mm:ss')}</>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`../assignment/workspace/${record.id}/scoring`}>
                        <Button
                            type="primary"
                            icon={<FolderOpenOutlined />}
                            size="middle"
                        >
                            Open
                        </Button>
                    </Link>
                </Space>
            ),
        },
    ];
    return (
        <StandardLayout allowedRole={['SuperCommittee', 'Mentor']} title={"Submissions"}>
            <PageHeader onBack={() => navigate(-1)} title="List Submission" />
            <LastUpdateStatus lastUpdate={lastUpdate} />
            <Spin tip="Fetching data..." spinning={loading}>
                <Table columns={columns} dataSource={data} pagination={{
                    total, current: page, pageSize, showSizeChanger: false, onChange: (e) => {
                        queryParams.set('page', e.toString());
                        setQueryParams(queryParams);
                        setPage(e);
                    }
                }} />
            </Spin>
        </StandardLayout >
    );
};
