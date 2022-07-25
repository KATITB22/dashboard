import { IEvent, ITable } from '../../service/attendance';

export interface SelfProps {
    visibleModal: boolean;
    selectedEvent: IEvent;
    loadingOk: boolean;
    handleOk: (e: React.MouseEvent<HTMLElement>) => void;
    handleCancel: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface GroupProps {
    visibleModal: boolean;
    selectedEvent: IEvent;
    loadingOk: boolean;
    handleOk: (e: React.MouseEvent<HTMLElement>) => void;
    handleCancel: (e: React.MouseEvent<HTMLElement>) => void;
    dataSource: ITable[];
    setDataSource: React.Dispatch<React.SetStateAction<ITable[]>>;
    selectedRowKeys: React.Key[];
    setSelectedRowKeys: (value: React.SetStateAction<React.Key[]>) => void;
}
