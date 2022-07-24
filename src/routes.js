import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
    MdBarChart,
    MdPerson,
    MdHome,
    MdLock,
    MdOutlineShoppingCart,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import RTL from 'views/admin/rtl';

// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
    {
        name: 'Tiếp nhận thông tin',
        layout: '/admin',
        path: '/default',
        icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
        component: MainDashboard,
    },
    {
        name: 'Thông tin chuyến xe',
        layout: '/admin',
        path: '/nft-marketplace',
        icon: (
            <Icon
                as={MdOutlineShoppingCart}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        component: NFTMarketplace,
        secondary: true,
    },
    {
        name: 'Quản lý dữ liệu',
        layout: '/admin',
        icon: (
            <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />
        ),
        path: '/data-tables',
        component: DataTables,
    },
    {
        name: 'Quản lý người dùng',
        layout: '/admin',
        path: '/profile',
        icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
        component: Profile,
    },
    {
        name: 'Đăng nhập',
        layout: '/auth',
        path: '/sign-in',
        icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
        component: SignInCentered,
    },
    {
        name: 'Báo cáo thống kê',
        layout: '/rtl',
        path: '/rtl-default',
        icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
        component: RTL,
    },
];

export default routes;