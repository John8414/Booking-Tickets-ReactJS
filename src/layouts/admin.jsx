import {
    ClockCircleTwoTone,
    EyeOutlined,
    UserOutlined,
    FolderViewOutlined,
    FolderAddOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu } from 'antd'
import React, { useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    }
}

const items = [
    getItem('Users', 'sub1', <UserOutlined />, [
        getItem('User Admin', '/admin/user-management', <UserOutlined />),
        getItem('Add User ', '/admin/user-management/create', <UserOutlined />),
    ]),
    getItem('Films', 'sub2', <EyeOutlined />, [
        getItem('Film', '/admin/movie-management', <FolderViewOutlined />),
        getItem('Add Moive', '/admin/movie-management/create', <FolderAddOutlined />),
    ]),
]

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false)

    const navigate = useNavigate()

    const handleClick = (e) => {
        navigate(`${e.key}`)
    }
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" />
                <Menu
                    onClick={handleClick}
                    theme="dark"
                    defaultSelectedKeys={['/admin/movie-management']}
                    defaultOpenKeys={['sub2']}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Movie CapstoneJS Admin
                </Footer>
            </Layout>
        </Layout>
    )
}
