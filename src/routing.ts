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
    import('./pages/Assignments/Topic').then((module) => ({
        default: module.Topic,
    }))
);
const TopicAdminPage = React.lazy(() =>
    import('./pages/Assignments/Topic').then((module) => ({
        default: module.TopicAdmin,
    }))
);

const CreateTopicPage = React.lazy(() =>
    import('./pages/Assignments/CreateTopic').then((module) => ({
        default: module.CreateTopic,
    }))
);

const EditTopicPage = React.lazy(() =>
    import('./pages/Assignments/EditTopic').then((module) => ({
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


const GroupListPage = React.lazy(() =>
    import('./pages/Group/GroupList').then((module) => ({
        default: module.GroupList,
    }))
);

const GroupDetailPage = React.lazy(() =>
    import('./pages/Group/GroupDetail').then((module) => ({
        default: module.GroupDetail,
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

const WorkspacePage = React.lazy(() =>
    import('./pages/Assignments/Workspace').then((module) => ({
        default: module.Workspace,
    }))
);

interface PageRouting {
    path: string;
    component: LazyExoticComponent<any>;
}

const PageNotFoundRouting: PageRouting = {
    path: '*',
    component: PageNotFound,
};

export const Routing: PageRouting[] = [
    {
        path: '/',
        component: DefPage,
    },
    {
        path: '/event/create',
        component: CreateEventPage,
    },
    {
        path: '/event/:id',
        component: EventDetailPage,
    },
    {
        path: '/event/:id/edit',
        component: EditEventPage,
    },
    {
        path: '/assignment',
        component: TopicPage,
    },
    {
        path: '/assignment/admin',
        component: TopicAdminPage,
    },
    {
        path: '/assignment/create',
        component: CreateTopicPage,
    },
    {
        path: '/assignment/:id',
        component: EditTopicPage,
    },
    {
        path: '/assignment/workspace/:id',
        component: WorkspacePage,
    },
    {
        path: '/assignment/:id/submissions',
        component: SubmissionListPage,
    },
    {
        path: '/submission/:id',
        component: SubmissionDetailsPage,
    },
    {
        path: '/group',
        component: GroupListPage,
    },
    {
        path: '/group/:id',
        component: GroupDetailPage,
    },
    {
        path: '/event',
        component: EventListPage,
    },
    {
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
