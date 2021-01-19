import React from 'react';
import { Equalizer, Description, People, Settings } from '@material-ui/icons';


export const SidebarData = [
    {
        title: 'Dashbord',
        path: '/user/dashboard',
        icon: <Equalizer />,
        cName: 'nav-text',
        private: false
    },
    {
        title: 'Data',
        path: '/user/data',
        icon: <Description />,
        cName: 'nav-text',
        private: false
    },
    {
        title: 'Team',
        path: '/user/team',
        icon: <People />,
        cName: 'nav-text',
        private: true
    },
    {
        title: 'Accounts',
        path: '/user/account',
        icon: <Settings />,
        cName: 'nav-text',
        private: false
    }
]