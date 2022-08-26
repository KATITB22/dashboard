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
    import('./pages/NotFound').then((module) => ({
        default: module.Page,
    }))
);

const WorkspacePage = React.lazy(() =>
    import('./pages/Assignments/Workspace').then((module) => ({
        default: module.Workspace,
    }))
);

const WorkspaceScoringPage = React.lazy(() =>
    import('./pages/Assignments/WorkspaceScoring').then((module) => ({
        default: module.WorkspaceScoring,
    }))
);

const ProfilePage = React.lazy(() =>
    import('./pages/Profile/Profile').then((module) => ({
        default: module.Profile,
    }))
);

const EditProfilePage = React.lazy(() =>
    import('./pages/Profile/EditProfile').then((module) => ({
        default: module.EditProfile,
    }))
);

// const JarkomPage = React.lazy(() =>
//     import('./pages/Jarkom/Jarkom').then((module) => ({
//         default: module.Jarkom,
//     }))
// );

// const AddJarkomPage = React.lazy(() =>
//     import('./pages/Jarkom/AddJarkom').then((module) => ({
//         default: module.AddJarkom,
//     }))
// );

const SamitraBanPage = React.lazy(() =>
    import('./pages/Samitra/SamitraBans').then((module) => ({
        default: module.SamitraBans,
    }))
);

const SamitraReportPage = React.lazy(() =>
    import('./pages/Samitra/SamitraReports').then((module) => ({
        default: module.SamitraReports,
    }))
);

const SurveyPage = React.lazy(() =>
    import('./pages/Survey/Survey').then((module) => ({
        default: module.Survey,
    }))
);

const ScoringPage = React.lazy(() =>
    import('./pages/Scoring/Scoring').then((module) => ({
        default: module.Scoring,
    }))
);

const LiveStatusPage = React.lazy(() =>
    import('./pages/Live/Live').then((module) => ({
        default: module.LiveStatus,
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
        path: '/assignment/super',
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
        path: '/assignment/workspace/:id/scoring',
        component: WorkspaceScoringPage,
    },
    {
        path: '/assignment/:id/submissions',
        component: SubmissionListPage,
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
        path: '/attendance',
        component: SelfAttendancePage,
    },
    {
        path: '/attendance/mentor',
        component: GroupAttendancePage,
    },
    {
        path: '/profile',
        component: ProfilePage,
    },
    {
        path: '/profile/edit',
        component: EditProfilePage,
    },
    // {
    //     path: '/jarkom',
    //     component: AddJarkomPage,
    // },
    {
        path: '/samitra/bans',
        component: SamitraBanPage,
    },
    {
        path: '/samitra/reports',
        component: SamitraReportPage,
    },
    {
        path: '/survey',
        component: SurveyPage,
    },
    {
        path: '/scoring',
        component: ScoringPage,
    },
    {
        path: '/live',
        component: LiveStatusPage,
    },
    PageNotFoundRouting,
];
