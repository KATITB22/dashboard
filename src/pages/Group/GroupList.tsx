import { PageHeader, Spin, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import service, { Group } from '../../service/group';

export const GroupList = () => {
    const navigate = useNavigate();
    const [queryParams, setQueryParams] = useSearchParams();
    const [page, setPage] = useState<number>(1);
    const [groups, setGroups] = useState<Group[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // const dataSource = [
    //     {
    //         key: '1',
    //         name: 'Group 1',
    //     },
    //     {
    //         key: '2',
    //         name: 'Group 2',
    //     },
    // ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text: string) => (
                <Link to={`/groups/${text}`}>
                    <span>{text}</span>
                </Link>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
    ];

    useEffect(() => {
        const queryPage = queryParams.get('page');
        if (queryPage && +queryPage) {
            setPage(+queryPage);
        }
        service.getGroups(page, (res) => {
            setGroups(res.groups);
            setTotal(res.total);
            setPage(res.page);
            setPageSize(res.pageSize);
            setIsLoading(false);
        });
    }, []);

    return (
        <StandardLayout>
            <>
                <PageHeader onBack={() => navigate(-1)} title="Group List" />
                <Spin tip="Fetching data..." spinning={isLoading}>
                    <Table
                        columns={columns}
                        dataSource={groups}
                        pagination={{
                            total,
                            current: page,
                            pageSize,
                            showSizeChanger: false,
                            onChange: (e) => {
                                queryParams.set('page', e.toString());
                                setQueryParams(queryParams);
                                setPage(e);
                            },
                        }}
                    />
                </Spin>
            </>
        </StandardLayout>
    );
};
