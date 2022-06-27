import React, { LazyExoticComponent } from 'react';

const DefPage = React.lazy(() =>
    import('./pages/Dashboard').then((module) => ({
        default: module.Dashboard,
    }))
);

const CreateEventPage = React.lazy(() =>
    import('./pages/event/Create').then((module) => ({
        default: module.CreateEvent,
    }))
);

const EventDetailPage = React.lazy(() =>
    import('./pages/event/Detail').then((module) => ({
        default: module.EventDetail,
    }))
);

const EditEventPage = React.lazy(() =>
    import('./pages/event/Edit').then((module) => ({
        default: module.EditEvent,
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
    PageNotFoundRouting,
];
