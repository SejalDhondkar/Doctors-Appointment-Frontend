// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    PieChartOutlined,
    EditOutlined,
    ClockCircleOutlined,
    CarryOutOutlined
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
    PieChartOutlined,
    EditOutlined,
    ClockCircleOutlined,
    CarryOutOutlined
};

const doctorList = {
    items: [
        {
            id: 'group-dashboard',
            title: 'Navigation',
            type: 'group',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/',
                    icon: icons.PieChartOutlined
                },
                {
                    id: 'add-info',
                    title: 'Edit Details',
                    type: 'item',
                    url: '/details',
                    icon: icons.EditOutlined
                },
                {
                    id: 'patient-list',
                    title: 'Your Appointments',
                    type: 'item',
                    url: '/patient-list',
                    icon: icons.ClockCircleOutlined
                },
                {
                    id: 'manage-slots',
                    title: 'Manage Slots',
                    type: 'item',
                    url: '/manage-slots',
                    icon: icons.CarryOutOutlined
                }
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
