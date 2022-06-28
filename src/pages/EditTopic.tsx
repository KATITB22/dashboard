import { StandardLayout } from '../layout/StandardLayout';
import { TopicForm } from '../components/TopicForm';

export const EditTopic = () => (
    <StandardLayout>
        <TopicForm isCreating={false} />
    </StandardLayout>
);
