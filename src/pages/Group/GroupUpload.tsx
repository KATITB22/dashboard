import { StandardLayout } from '../../layout/StandardLayout';
import { GroupUploadForm } from '../../components/GroupUploadForm';

export const GroupUpload = () => (
    <StandardLayout allowedRole={"SuperCommittee"} title={"Group Upload"} >
        <GroupUploadForm />
    </StandardLayout>
);
