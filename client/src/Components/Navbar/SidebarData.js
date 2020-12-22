import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';


export const SidebarData = [
    {
        title: 'Dashbord',
        path: '/user/dashboard',
        icon: <FaIcons.FaChartLine />,
        cName: 'nav-text'
    },
    {
        title: 'Data',
        path: '/user/data',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Team',
        path: '/user/team',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path: '/user/settings',
        icon: <FaIcons.FaCogs />,
        cName: 'nav-text'
    }
]