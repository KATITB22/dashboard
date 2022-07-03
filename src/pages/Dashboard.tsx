import { ClockCircleOutlined } from '@ant-design/icons';
import { Alert, Descriptions, PageHeader, Timeline } from 'antd';
import { StandardLayout } from '../layout/StandardLayout';

export const Dashboard = () => (
    <StandardLayout>
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
        <Descriptions title="User Info" bordered>
            <Descriptions.Item label="NIM">10019000</Descriptions.Item>
            <Descriptions.Item label="Faculty">-</Descriptions.Item>
            <Descriptions.Item label="Campus">-</Descriptions.Item>
            <Descriptions.Item label="Sex">Male</Descriptions.Item>
            <Descriptions.Item label="Role">-</Descriptions.Item>
        </Descriptions>
        <Timeline mode="alternate" className='mt-16'>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item dot={<ClockCircleOutlined />}>Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        </Timeline>
    </StandardLayout>
);
