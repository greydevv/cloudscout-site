import React from 'react';
import { DashboardRounded, StarRounded } from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';

export const SidebarData = [
    {
        text: 'Dashboard',
        path: '/',
        icon: <DashboardRounded/>,
        cls: 'nav-text'
    },
    {
        text: 'Favorites',
        path: '/favorites',
        icon: <StarRounded/>,
        cls: 'nav-text'
    },
    {
        text: 'High School',
        path: '/High_School',
        icon: <SchoolIcon/>,
        cls: 'nav-text'
    }
];
