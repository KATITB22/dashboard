import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { StandardLayout } from '../../layout/StandardLayout';
import samitraService from '../../service/samitra';

interface ReportData {
    id: number;
    chat_id: string;
    issuer_id: string;
    issued_id: string;
    reason: string;
    seen_by?: string;
}

interface ReportsResponse {
    reports: ReportData[];
}

export const SamitraReports = () => {
    const [reportsData, setReportsData] = useState<ReportData[]>([]);

    const tableColumn = [
        {
            title: 'ID',
            dataIndex: 'id',
            name: 'id',
            width: '5%',
        },
        {
            title: 'Chat ID',
            dataIndex: 'chat_id',
            name: 'chat_id',
        },
        {
            title: 'Reported',
            dataIndex: 'issued_id',
            name: 'issued_id',
        },
        {
            title: 'Reporter',
            dataIndex: 'issuer_id',
            name: 'issuer_id',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            name: 'reason',
            width: '50%',
        },
        {
            title: 'Seen by',
            dataIndex: 'seen_by',
            name: 'seen_by',
            width: '10%',
        },
    ];

    const getReports = async () => {
        try {
            const res = (await samitraService.getReports()) as ReportsResponse;
            if (res) {
                const reports = res.reports.map((report) => ({
                    ...report,
                    seen_by: report.seen_by || '-',
                    key: report.id,
                }));
                setReportsData(() => [...reports]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getReports();
    }, []);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        console.log('Selected', selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const markSeen = async () =>
        Promise.all(
            selectedRowKeys.map(async (id) => {
                console.log('Handling id', id);
                await samitraService.markSeen(id as number);
            })
        );

    const handleMarkSeen = async () => {
        setLoading(true);
        try {
            await markSeen();
            getReports();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        setSelectedRowKeys([]);
    };

    return (
        <StandardLayout allowedRole="Committee" title="Samitra Ban">
            <Button
                className="mb-4"
                type="primary"
                onClick={handleMarkSeen}
                disabled={!hasSelected}
                loading={loading}
            >
                Mark as seen
            </Button>
            <Table
                rowSelection={rowSelection}
                dataSource={reportsData}
                columns={tableColumn}
            />
        </StandardLayout>
    );
};
