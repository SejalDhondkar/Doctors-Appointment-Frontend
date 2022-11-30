// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined
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
    AppstoreAddOutlined
};

const doctorList = {
    items: [
        {
            id: 'group-dashboard',
            title: 'Navigation',
            type: 'group',
            children: [
                {
                    id: 'login1',
                    title: 'Login D',
                    type: 'item',
                    url: '/login',
                    icon: icons.LoginOutlined,
                    target: true
                },
                {
                    id: 'register1',
                    title: 'Register D',
                    type: 'item',
                    url: '/register',
                    icon: icons.ProfileOutlined,
                    target: true
                },
                {
                    id: 'add-info',
                    title: 'Edit Details',
                    type: 'item',
                    url: '/details',
                    icon: icons.ProfileOutlined
                },
                {
                    id: 'util-typography',
                    title: 'Typography',
                    type: 'item',
                    url: '/typography',
                    icon: icons.FontSizeOutlined
                },
                {
                    id: 'util-color',
                    title: 'Color',
                    type: 'item',
                    url: '/color',
                    icon: icons.BgColorsOutlined
                },
                {
                    id: 'util-shadow',
                    title: 'Shadow',
                    type: 'item',
                    url: '/shadow',
                    icon: icons.BarcodeOutlined
                },
                {
                    id: 'ant-icons',
                    title: 'Ant Icons',
                    type: 'item',
                    url: '/icons/ant',
                    icon: icons.AntDesignOutlined,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default doctorList;
