import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { StandardLayout } from '../../layout/StandardLayout';
import samitraService from '../../service/samitra';

interface ReportData {
    id: number;
    chat_id: string;
    issuer_id: string;
    issued_id: string;
    reason: string;
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
            width: '55%',
        },
    ];

    const getReports = async () => {
        try {
            const res = (await samitraService.getReports()) as ReportsResponse;
            setReportsData(() => [...res.reports]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getReports();
    }, []);

    return (
        <StandardLayout allowedRole="Committee" title="Samitra Ban">
            <Table dataSource={reportsData} columns={tableColumn} />
        </StandardLayout>
    );
};
