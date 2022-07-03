import { PageHeader, Spin, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

    const columns = [
        {
            title: 'No.',
            dataIndex: 'idx',
            key: 'id',
            render: (_: any, record: any, idx: number) => (<>{+idx + 1 + ((page - 1) * pageSize)}</>),
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
    }, [page]);

    return (
        <StandardLayout allowedRole={["Committee"]}>
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
                    }} onRow={(record) => {
                        return {
                            onClick: () => { navigate(`../group/${record.id}`) }
                        };
                    }}
                />
            </Spin>
        </StandardLayout>
    );
};
