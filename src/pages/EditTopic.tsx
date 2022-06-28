import { Divider, List, PageHeader } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StandardLayout } from '../layout/StandardLayout';
import { TopicForm } from '../components/TopicForm';

export const EditTopic = () => {
    const navigate = useNavigate();

    const data = [
        'Pertanyaan XX',
        'Pertanyaan XX',
        'Pertanyaan XX',
        'Pertanyaan XX',
        'Pertanyaan XX',
    ];

    return (
        <StandardLayout>
            <PageHeader onBack={() => navigate(-1)} title="Edit Topic" />
            <TopicForm isCreating={false} />
            <Divider orientation="left">Pertanyaan</Divider>
            <List
                size="large"
                bordered
                dataSource={data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </StandardLayout>
    );
};
