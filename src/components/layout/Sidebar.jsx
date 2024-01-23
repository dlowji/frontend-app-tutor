import React from 'react';
import { Layout, Menu, Flex } from 'antd';
const { Sider } = Layout;
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
	(icon, index) => ({
		key: String(index + 1),
		icon: React.createElement(icon),
		label: `nav ${index + 1}`,
	})
);

export default function Sidebar() {
	return (
		<Sider
			breakpoint="lg"
			collapsedWidth="0"
			onBreakpoint={(broken) => {
				console.log(broken);
			}}
			onCollapse={(collapsed, type) => {
				console.log(collapsed, type);
			}}
		>
			<Flex align="center" justify="center" className="m-4">
				<img
					src="https://edx-cdn.org/v3/default/logo-white.svg"
					alt="logo"
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}
				/>
			</Flex>
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
		</Sider>
	);
}
