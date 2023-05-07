// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    FileSearchOutlined,
    HeartOutlined,
    ClockCircleOutlined,
    CheckSquareOutlined,
} from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    FileSearchOutlined,
    HeartOutlined,
    ClockCircleOutlined,
    CheckSquareOutlined
};

const doctorList = {
    items: [
        {
            id: 'group-dashboard',
            title: 'Navigation',
            type: 'group',
            children: [
                // {
                //     id: 'dashboard',
                //     title: 'Dashboard',
                //     type: 'item',
                //     url: '/',
                //     icon: icons.LoginOutlined
                // },
                {
                    id: 'add-info',
                    title: 'Search All Doctors',
                    type: 'item',
                    url: '/doctors',
                    icon: icons.FileSearchOutlined
                },
                {
                    id: 'mental-health-list',
                    title: 'Mental Health Professionals',
                    type: 'item',
                    url: '/doctors/mental-health-professionals',
                    icon: icons.HeartOutlined
                },
                {
                    id: 'history',
                    title: 'Your Appointments',
                    type: 'item',
                    url: '/previous-bookings',
                    icon: icons.ClockCircleOutlined
                },
                {
                    id: 'mental-health',
                    title: 'Mental Health Quiz',
                    type: 'item',
                    url: '/user/mentalcheck',
                    icon: icons.CheckSquareOutlined
                },
                // {
                //     id: 'util-typography',
                //     title: 'Typography',
                //     type: 'item',
                //     url: '/typography',
                //     icon: icons.FontSizeOutlined
                // },
                // {
                //     id: 'util-color',
                //     title: 'Color',
                //     type: 'item',
                //     url: '/color',
                //     icon: icons.BgColorsOutlined
                // },
                // {
                //     id: 'util-shadow',
                //     title: 'Shadow',
                //     type: 'item',
                //     url: '/shadow',
                //     icon: icons.BarcodeOutlined
                // },
                // {
                //     id: 'ant-icons',
                //     title: 'Ant Icons',
                //     type: 'item',
                //     url: '/icons/ant',
                //     icon: icons.AntDesignOutlined,
                //     breadcrumbs: false
                // }
            ]
        }
    ]
};

export default doctorList;
