import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
    MdOutlineEditLocationAlt,
    MdOutlineAdminPanelSettings,
    MdOutlinePhoneCallback,
    MdOutlineManageAccounts,
    MdOutlineBubbleChart,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';

// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
    {
        name: 'Tiếp nhận thông tin',
        layout: '/admin',
        path: '/default',
        icon: (
            <Icon
                as={MdOutlinePhoneCallback}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        component: MainDashboard,
    },
    {
        name: 'Thông tin chuyến xe',
        layout: '/admin',
        path: '/trips',
        icon: (
            <Icon
                as={MdOutlineBubbleChart}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        component: NFTMarketplace,
        secondary: true,
    },
    {
        name: 'Định vị GPS',
        layout: '/admin',
        path: '/gps',
        icon: (
            <Icon
                as={MdOutlineEditLocationAlt}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        component: DataTables,
    },
    {
        name: 'Quản lý hệ thống',
        layout: '/admin',
        path: '/manager',
        icon: (
            <Icon
                as={MdOutlineAdminPanelSettings}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        component: Profile,
    },
    {
        name: 'Đăng nhập',
        layout: '/auth',
        path: '/sign-in',
        icon: (
            <Icon
                as={MdOutlineManageAccounts}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        component: SignInCentered,
    },
];

export default routes;
