import React, { LazyExoticComponent } from 'react';

const DefPage = React.lazy(() =>
    import('./pages/Dashboard').then((module) => ({
        default: module.Dashboard,
    }))
);

const TopicPage = React.lazy(() =>
    import('./pages/Topic/Topic').then((module) => ({
        default: module.Topic,
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

const ParticipantAttendancePage = React.lazy(() =>
    import('./pages/Attendance/ParticipantAttendance').then((module) => ({
        default: module.ParticipantAttendance,
    }))
);

const MentorAttendancePage = React.lazy(() =>
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
        title: 'Topic List',
        path: '/topic',
        component: TopicPage,
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
        title: 'Participant Attendance',
        path: '/attendance/participant',
        component: ParticipantAttendancePage,
    },
    {
        title: 'Mentor Attendance',
        path: '/attendance/mentor',
        component: MentorAttendancePage,
    },
    PageNotFoundRouting,
];
