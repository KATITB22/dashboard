import React, { LazyExoticComponent } from 'react';

const DefPage = React.lazy(() =>
    import('./pages/Dashboard').then((module) => ({
        default: module.Dashboard,
    }))
);

const CreateEventPage = React.lazy(() =>
    import('./pages/Event/Create').then((module) => ({
        default: module.CreateEvent,
    }))
);

const EventDetailPage = React.lazy(() =>
    import('./pages/Event/Detail').then((module) => ({
        default: module.EventDetail,
    }))
);

const EditEventPage = React.lazy(() =>
    import('./pages/Event/Edit').then((module) => ({
        default: module.EditEvent,
    }))
);

const TopicPage = React.lazy(() =>
    import('./pages/Topic/Topic').then((module) => ({
        default: module.Topic,
    }))
);
const TopicAdminPage = React.lazy(() =>
    import('./pages/Topic/Topic').then((module) => ({
        default: module.TopicAdmin,
    }))
);

const CreateTopicPage = React.lazy(() =>
    import('./pages/Topic/CreateTopic').then((module) => ({
        default: module.CreateTopic,
    }))
);

const EditTopicPage = React.lazy(() =>
    import('./pages/Topic/EditTopic').then((module) => ({
        default: module.EditTopic,
    }))
);

const SubmissionListPage = React.lazy(() =>
    import('./pages/Submission/SubmissionList').then((module) => ({
        default: module.SubmissionList,
    }))
);

const SubmissionDetailsPage = React.lazy(() =>
    import('./pages/Submission/SubmissionDetails').then((module) => ({
        default: module.SubmissionDetails,
    }))
);

const GroupUploadPage = React.lazy(() =>
    import('./pages/Group/GroupUpload').then((module) => ({
        default: module.GroupUpload,
    }))
);

const EventListPage = React.lazy(() =>
    import('./pages/Event/EventList').then((module) => ({
        default: module.EventList,
    }))
);

const SelfAttendancePage = React.lazy(() =>
    import('./pages/Attendance/ParticipantAttendance').then((module) => ({
        default: module.ParticipantAttendance,
    }))
);

const GroupAttendancePage = React.lazy(() =>
    import('./pages/Attendance/MentorAttendance').then((module) => ({
        default: module.MentorAttendance,
    }))
);

const PageNotFound = React.lazy(() =>
    import('./pages/Dashboard').then((module) => ({
        default: module.Dashboard,
    }))
);

interface PageRouting {
    title: string;
    path: string;
    component: LazyExoticComponent<any>;
}

const PageNotFoundRouting: PageRouting = {
    title: 'Page Not Found',
    path: '*',
    component: PageNotFound,
};

export const Routing: PageRouting[] = [
    {
        title: 'Default Page',
        path: '/',
        component: DefPage,
    },
    {
        title: 'New Event',
        path: '/event/create',
        component: CreateEventPage,
    },
    {
        title: 'Event Detail',
        path: '/event/:id',
        component: EventDetailPage,
    },
    {
        title: 'Edit Event',
        path: '/event/:id/edit',
        component: EditEventPage,
    },
    {
        title: 'Topic List',
        path: '/topic',
        component: TopicPage,
    },
    {
        title: 'Topic List',
        path: '/topic/admin',
        component: TopicAdminPage,
    },
    {
        title: 'Create Topic',
        path: '/topic/create',
        component: CreateTopicPage,
    },
    {
        title: 'Edit Topic',
        path: '/topic/:id',
        component: EditTopicPage,
    },
    {
        title: 'Submission List',
        path: '/topic/:id/submissions',
        component: SubmissionListPage,
    },
    {
        title: 'Submission Details',
        path: '/submissions/:id',
        component: SubmissionDetailsPage,
    },
    {
        title: 'Event List',
        path: '/event',
        component: EventListPage,
    },
    {
        title: 'Group Upload',
        path: '/group/upload',
        component: GroupUploadPage,
    },
    {
        title: 'Self Attendance',
        path: '/attendance/self',
        component: SelfAttendancePage,
    },
    {
        title: 'Group Attendance',
        path: '/attendance/group',
        component: GroupAttendancePage,
    },
    PageNotFoundRouting,
];
