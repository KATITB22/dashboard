import { PageHeader } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StandardLayout } from '../../layout/StandardLayout';
import { TopicForm } from '../../components/TopicForm';

export const CreateTopic = () => {
    const navigate = useNavigate();

    return (
        <StandardLayout allowedRole={"SuperCommittee"} title={"Create Topic"} >
            <PageHeader onBack={() => navigate(-1)} title="Create Topic" />
            <TopicForm />
        </StandardLayout>
    );
};
