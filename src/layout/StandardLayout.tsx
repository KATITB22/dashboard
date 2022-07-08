import React, { useContext, useState } from 'react';
import { MenuProps, Layout, Menu, BackTop, Result, Button } from 'antd';
import {
    CalendarOutlined,
    ContactsOutlined,
    FileTextOutlined,
    HomeOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { NavTab } from '../components/NavTab';
import { UserContext } from '../context';
import { useNavigate } from 'react-router-dom';
import Logo from '../resource/logo.png';
import AuthService from '../service/auth';
import { sleep } from '../utils/sleep';

const { Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
export interface StandardLayoutProps {
    children?: JSX.Element | JSX.Element[] | string | string[];
    allowedRole: string | string[];
}

const Logout = () => {
    const navigate = useNavigate();
    return (<div onClick={async () => {
        AuthService.logout();
        navigate("../");
        window.location.reload();
    }}>Logout</div>)
};

const itemsCommittee: MenuItem[] = [
    getItem(<NavTab url="../">Home</NavTab>, '0', <HomeOutlined />),
    getItem(<NavTab url="../event">Event</NavTab>, '1', <CalendarOutlined />),
    getItem('Group', '2', <ContactsOutlined />, [
        getItem(<NavTab url="../group">List</NavTab>, '2a'),
        getItem(<NavTab url="../group/upload">Upload</NavTab>, '2b')
    ]),
    getItem(<NavTab url="../assignment/super">Assignment</NavTab>, '3', <FileTextOutlined />),
    getItem(<NavTab url="../profile">Profile</NavTab>, '4', <ContactsOutlined />),
    getItem(<Logout />, "99", <LogoutOutlined />)
];

const itemsMentor: MenuItem[] = [
    getItem(<NavTab url="../">Home</NavTab>, '0', <HomeOutlined />),
    getItem(<NavTab url="../attendance/mentor">Attendance</NavTab>, '1', <CalendarOutlined />),
    getItem(<NavTab url="../assignment/super">Assignment</NavTab>, '2', <FileTextOutlined />),
    getItem(<NavTab url="../profile">Profile</NavTab>, '3', <ContactsOutlined />),
    getItem(<Logout />, "99", <LogoutOutlined />)
];
const itemsParticipant: MenuItem[] = [
    getItem(<NavTab url="../">Home</NavTab>, '0', <HomeOutlined />),
    getItem(<NavTab url="../attendance">Attendance</NavTab>, '1', <CalendarOutlined />),
    getItem(<NavTab url="../assignment">Assignment</NavTab>, '2', <FileTextOutlined />),
    getItem(<NavTab url="../profile">Profile</NavTab>, '3', <ContactsOutlined />),
    getItem(<Logout />, "99", <LogoutOutlined />)
];

const sidebarMaping: { [key: string]: MenuItem[] } = {
    'Mentor': itemsMentor,
    'Participant': itemsParticipant,
    'Committee': itemsCommittee,
}

const style: React.CSSProperties = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
};

export const StandardLayout = ({
    children = undefined,
    allowedRole
}: StandardLayoutProps) => {
    const navigate = useNavigate();
    const { user }: any = useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false);
    const renderChild: boolean = sidebarMaping[user.role] !== undefined;
    let rolePermitted: boolean = false;
    if (Array.isArray(allowedRole)) {
        if (allowedRole.find((each) => each === user.role)) {
            rolePermitted = true;
        }
    } else {
        rolePermitted = (allowedRole === user.role);
    }

    if (!(rolePermitted && renderChild)) {
        children = <Result
            status="warning"
            title="You have no permission to open this page."
            extra={
                <Button type="primary" onClick={() => navigate("../")}>
                    Back
                </Button>
            }
        />
    }

    return (<>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{ minHeight: '100vh', zIndex: 2 }}

            >
                <div className="flex justify-center my-2 md:my-3 flex-wrap">
                    <div className='w-3/4'>
                        <img src={Logo} className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                    </div>
                </div>
                <Menu
                    theme="dark"
                    selectedKeys={[]}
                    mode="inline"
                    items={sidebarMaping[user.role]}
                />
            </Sider>
            <Layout>
                <Content style={{ margin: '0 16px' }}>
                    <div
                        className="text-xl"
                        style={{ padding: 24, minHeight: 360 }}
                    >
                        {children}
                    </div>
                </Content>
                <hr />
                <Footer style={{ textAlign: 'center', zIndex: 1 }}>
                    Dashboard KAT © 2022.<br /> Created by IT KAT '22.
                </Footer>
            </Layout>
            <BackTop>
                <div style={style}>UP</div>
            </BackTop>
        </Layout>
        {/* <div className='flex justify-center'>
            <div className='fixed z-1 bottom-0 w-[95vw] border border-red-500 flex flex-row text-center translate-x-10'>
                <div className='w-2/12 translate-y-[-5]'>
                    <img src={House} />
                </div>
            </div>
        </div> */}
    </>
    );
};
