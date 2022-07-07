import { Alert, Button, Spin } from "antd"
import { useContext } from "react"
import { WorkspaceContext } from "../../context"

interface SaveStatusProps {
    loading?: boolean;
    saveButtonHandler: Function;
}

const AlertSwitch = ({ saveButtonHandler }: any) => {
    const { canSave, lastUpdate }: any = useContext(WorkspaceContext);
    if (canSave()) {
        return (<Alert
            message="Unsaved changes"
            showIcon
            description={<><p>Semua perubahan terakhir <b>BELUM</b> disimpan.</p><p>Terakhir disimpan pada {lastUpdate}.</p></>}
            type="warning"
            action={
                <Button size="middle" type="primary" onClick={() => saveButtonHandler()}>
                    Simpan
                </Button>
            }
        />)
    } else {
        return (<Alert
            message="Changes are saved"
            showIcon
            description={<><p>Semua perubahan terakhir sudah tersimpan.</p><p>Terakhir disimpan pada {lastUpdate}.</p></>}
            type="success"
        />)
    }
}

export const SaveStatus = ({ loading = false, saveButtonHandler }: SaveStatusProps) => {
    return (
        <Spin tip="Loading..." spinning={loading}>
            <AlertSwitch saveButtonHandler={saveButtonHandler} />
        </Spin>
    )

}