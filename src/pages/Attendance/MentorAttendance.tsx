import type { BadgeProps } from 'antd';
import { Badge, Button, Calendar, PageHeader, Spin, Collapse  } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { MentorAttendanceModal } from '../../components/AttendanceModal';
import { StandardLayout } from '../../layout/StandardLayout';
import { defaultFailureCallback } from '../../service';
import service, { IEvent, ITable } from '../../service/attendance';
import { getType } from './helper';

const { Panel } = Collapse;

export const MentorAttendance = () => {
    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingOkModalButton, setLoadingOkModalButton] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [eventList, setEventList] = useState<IEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<IEvent>({
        id: '',
        title: '',
        start_date: moment(),
        end_date: moment(),
        type: '',
    });
    const [dataSource, setDataSource] = useState<ITable[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const currentDate = moment(new Date()).format('MM-DD-YYYY')

    const handleOkModalButton = () => {
        setLoadingOkModalButton(true);

        const attend: number[] = selectedRowKeys.map((key) =>
            parseInt(key.toString())
        );
        const notAttend: number[] = dataSource
            .map((element) => parseInt(element.key.toString()))
            .filter((key) => !attend.includes(key));

        service.groupAttendance(
            selectedEvent.id,
            attend,
            notAttend,
            () => {
                setVisibleModal(false);
                setLoadingOkModalButton(false);
                setSelectedRowKeys([]);
            },
            (err) => {
                defaultFailureCallback(err);
                setLoadingOkModalButton(false);
            }
        );
    };

    const handleEventClick = (event: IEvent) => {
        setSelectedEvent(event);
        setVisibleModal(true);
    };

    const dateCellRender = (newValue: Moment) => {
        const eventData = eventList.filter((event) =>
            event.start_date.isSame(newValue, 'date')
        );

        if (eventData.length === 0) {
            return <p>Tidak ditemukan acara pada saat ini.</p>
        }

        return (
            <ul>
                {eventData.map((event) => (
                    <li key={event.id} className="mb-2" >
                        <Button
                            className='w-full md:w-1/2'
                            type="primary"
                            onClick={() => {
                                handleEventClick(event);
                            }}
                        >
                            <Badge
                                status={getType(event) as BadgeProps['status']}
                                text={event.title}
                            />
                        </Button>
                    </li>
                ))}
            </ul>
        );
    };

    useEffect(() => {
        setLoadingPage(true);
        service.getEvents(
            (res) => {
                setEventList(res.result);
                setLoadingPage(false);
            },
            (err) => {
                defaultFailureCallback(err);
                setLoadingPage(false);
            }
        );
    }, []);

    return (
        <StandardLayout allowedRole={"Mentor"} title={"Mentor Attendance"} >
            <Spin tip="Loading..." spinning={loadingPage}>
                <PageHeader
                    title="Group Attendance"
                />
                <Collapse bordered={false} defaultActiveKey={currentDate}>
                    <Panel header="17 Agustus 2022" key={moment(new Date('August 17, 2022')).format('MM-DD-YYYY')}>
                        {dateCellRender(moment(new Date('August 17, 2022')))}
                    </Panel>
                    <Panel header="18 Agustus 2022" key={moment(new Date('August 18, 2022')).format('MM-DD-YYYY')}>
                        {dateCellRender(moment(new Date('August 18, 2022')))}
                    </Panel>
                    <Panel header="19 Agustus 2022" key={moment(new Date('August 19, 2022')).format('MM-DD-YYYY')}>
                        {dateCellRender(moment(new Date('August 19, 2022')))}
                    </Panel>
                </Collapse>
                {visibleModal && (
                    <MentorAttendanceModal
                        visibleModal={visibleModal}
                        selectedEvent={selectedEvent}
                        handleOk={handleOkModalButton}
                        loadingOk={loadingOkModalButton}
                        handleCancel={() => {
                            setVisibleModal(false);
                        }}
                        dataSource={dataSource}
                        setDataSource={setDataSource}
                        selectedRowKeys={selectedRowKeys}
                        setSelectedRowKeys={setSelectedRowKeys}
                    />
                )}
            </Spin>
        </StandardLayout>
    );
};
