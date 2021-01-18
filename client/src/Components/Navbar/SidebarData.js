import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';


export const SidebarData = [
    {
        title: 'Dashbord',
        path: '/user/dashboard',
        icon: <FaIcons.FaChartLine />,
        cName: 'nav-text',
        private: false
    },
    {
        title: 'Data',
        path: '/user/data',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text',
        private: false
    },
    {
        title: 'Team',
        path: '/user/team',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text',
        private: true
    },
    {
        title: 'Accounts',
        path: '/user/account',
        icon: <FaIcons.FaCogs />,
        cName: 'nav-text',
        private: false
    }
]