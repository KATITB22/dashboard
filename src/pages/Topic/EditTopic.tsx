import { Divider, List, PageHeader } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import { TopicForm } from '../../components/TopicForm';

export const EditTopic = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <StandardLayout>
            <PageHeader onBack={() => navigate(-1)} title="Edit Topic" />
            <TopicForm id={id} />
            <Divider orientation="left">Pertanyaan</Divider>
            <List
                size="large"
                bordered
                dataSource={[]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </StandardLayout>
    );
};
