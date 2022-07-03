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
        title: 'Assignment List',
        path: '/assignments',
        component: TopicPage,
    },
    {
        title: 'Admin Assignment List',
        path: '/assignments/admin',
        component: TopicAdminPage,
    },
    {
        title: 'Create Assignment',
        path: '/assignments/create',
        component: CreateTopicPage,
    },
    {
        title: 'Edit Assignment',
        path: '/assignments/:id',
        component: EditTopicPage,
    },
    {
        title: 'Workspace',
        path: '/assignments/workspace/:id',
        component: WorkspacePage,
    },
    {
        title: 'Submission List',
        path: '/assignments/:id/submissions',
        component: SubmissionListPage,
    },
    {
        title: 'Submission Details',
        path: '/submissions/:id',
        component: SubmissionDetailsPage,
    },
    {
        title: 'Group List',
        path: '/groups',
        component: GroupListPage,
    },
    {
        title: 'Group List',
        path: '/groups/:id',
        component: GroupDetailPage,
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
    PageNotFoundRouting,
];
