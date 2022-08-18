import type { BadgeProps } from 'antd';
import { Badge, Button, PageHeader, Spin, Collapse } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { ParticipantAttendanceModal } from '../../components/AttendanceModal';
import { StandardLayout } from '../../layout/StandardLayout';
import { defaultFailureCallback } from '../../service';
import service, { IEvent } from '../../service/attendance';
import { getType } from './helper';

const { Panel } = Collapse;

export const ParticipantAttendance = () => {
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

    const currentDate = moment(new Date()).format('MM-DD-YYYY')

    const handleOkModalButton = () => {
        setLoadingOkModalButton(true);

        service.selfAttendance(
            selectedEvent.id,
            () => {
                setVisibleModal(false);
                setLoadingOkModalButton(false);
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
        <StandardLayout allowedRole={"Participant"} title={"Participant Attendance"} >
            <Spin tip="Loading..." spinning={loadingPage}>
                <PageHeader
                    title="Participant Attendance"
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
                    <ParticipantAttendanceModal
                        visibleModal={visibleModal}
                        selectedEvent={selectedEvent}
                        handleOk={handleOkModalButton}
                        loadingOk={loadingOkModalButton}
                        handleCancel={() => {
                            setVisibleModal(false);
                        }}
                    />
                )}
            </Spin>
        </StandardLayout>
    );
};
