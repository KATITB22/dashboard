import React, { useState } from 'react';
import { MenuProps, Layout, Menu, BackTop } from 'antd';
import {
    CalendarOutlined,
    ContactsOutlined,
    FileTextOutlined,
} from '@ant-design/icons';
import SkeletonAvatar from 'antd/lib/skeleton/Avatar';
import { NavTab } from '../components/NavTab';

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
}

const itemsComittee: MenuItem[] = [
    getItem(<NavTab url="../event">Event</NavTab>, '1', <CalendarOutlined />),
    getItem('Group', '2', <ContactsOutlined />, [
        getItem(<NavTab url="../group">List</NavTab>, '2a'),
        getItem(<NavTab url="../group/upload">Upload</NavTab>, '2b')
    ]),
    getItem(<NavTab url="../assignment/admin">Assignment</NavTab>, '3', <FileTextOutlined />)
];

const itemsMentor: MenuItem[] = [
    getItem(<NavTab url="../attendance">Attendance</NavTab>, '1', <CalendarOutlined />),
    getItem(<NavTab url="../assignment/admin">Assignment</NavTab>, '3', <FileTextOutlined />)
];
const itemsParticipant: MenuItem[] = [
    getItem(<NavTab url="../attendance">Attendance</NavTab>, '1', <CalendarOutlined />),
    getItem(<NavTab url="../assignment">Assignment</NavTab>, '2', <FileTextOutlined />)
];

const sidebarMaping: { [key: string]: MenuItem[] } = {
    'Mentor': itemsMentor,
    'Participant': itemsParticipant,
    'Comittee': itemsComittee
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
}: StandardLayoutProps) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{ minHeight: '100vh' }}

            >
                <div className="flex justify-center my-2 md:my-3">
                    <SkeletonAvatar size="large" />
                </div>
                <Menu
                    theme="dark"
                    selectedKeys={[]}
                    mode="inline"
                    items={itemsParticipant}
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
                <Footer style={{ textAlign: 'center' }}>
                    Dashboard KAT ©2022<br /> Created by Tim IT KAT '22.
                </Footer>
            </Layout>
            <BackTop>
                <div style={style}>UP</div>
            </BackTop>
        </Layout>
    );
};
