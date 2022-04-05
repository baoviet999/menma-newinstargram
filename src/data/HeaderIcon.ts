import { ReactComponent as Home } from '../assets/svg/Home.svg';
import { ReactComponent as Mess } from '../assets/svg/Mess.svg';
import { ReactComponent as Post } from '../assets/svg/Post.svg';
import { ReactComponent as Find } from '../assets/svg/Find.svg';
import { ReactComponent as Heart } from '../assets/svg/Heart.svg';

import { ReactComponent as AccSvg } from '../assets/svg/AccSvg.svg';
import { ReactComponent as BookSvg } from '../assets/svg/BookSvg.svg';
import { ReactComponent as SettingSvg } from '../assets/svg/SettingSvg.svg';
import { ReactComponent as SwitchSvg } from '../assets/svg/SwitchSvg.svg';

export const HEADER_ICON = [
    {
        icon: Home,
        status: false,
        name: 'home',
    },
    {
        icon: Mess,
        status: false,
        name: 'mess',
    },
    {
        icon: Post,
        status: false,
        name: 'post',
    },
    {
        icon: Find,
        status: false,
        name: 'find',
    },
    {
        icon: Heart,
        status: true,
        name: 'heart',
    },
];

export const ACCOUNT_ACTION = [
    {
        name: 'Trang cá nhân',
        icon: AccSvg,
        action: 'account',
    },
    {
        name: 'Đã lưu',
        icon: BookSvg,
        action: '',
    },
    {
        name: 'Cài đặt',
        icon: SettingSvg,
        action: '',
    },
    {
        name: 'Chuyển tài khoản',
        icon: SwitchSvg,
        action: '',
    },
    {
        name: 'Đăng xuất',
        action: 'logout',
    },
];
