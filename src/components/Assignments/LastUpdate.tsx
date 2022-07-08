import { Alert } from "antd";

interface LastUpdateStatusProps {
    lastUpdate: string;
}

export const LastUpdateStatus = ({ lastUpdate }: LastUpdateStatusProps) => {
    return (
        <div className='my-3 max-w-lg'>
            <Alert
                message="Last Update"
                showIcon
                description={<><p>Data diambil pada jam {lastUpdate}.</p></>}
                type="info"
            />
        </div>)
}