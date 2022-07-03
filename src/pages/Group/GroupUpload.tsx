import { StandardLayout } from '../../layout/StandardLayout';
import { GroupUploadForm } from '../../components/GroupUploadForm';

export const GroupUpload = () => (
    <StandardLayout allowedRole={"Committee"}>
        <GroupUploadForm />
    </StandardLayout>
);
