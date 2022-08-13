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
import RequestForm from 'views/admin/information';
import TripList from 'views/admin/trips';
import GPSCoordinates from 'views/admin/gps';
import Overview from 'views/admin/overview';

// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
    {
        name: 'Tiếp nhận thông tin',
        layout: '/admin',
        path: '/information',
        icon: (
            <Icon
                as={MdOutlinePhoneCallback}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        component: RequestForm,
    },
    {
        name: 'Danh sách đặt xe',
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
        component: TripList,
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
        component: GPSCoordinates,
    },
    {
        name: 'Quản lý hệ thống',
        layout: '/admin',
        path: '/overview',
        icon: (
            <Icon
                as={MdOutlineAdminPanelSettings}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        component: Overview,
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
