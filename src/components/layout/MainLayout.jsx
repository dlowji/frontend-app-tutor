import React from 'react';
import Sidebar from './Sidebar';
import { Layout, theme } from 'antd';
const { Content } = Layout;
import { IntlProvider } from '@edx/frontend-platform/i18n';
import Header from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';
import messages from '../../i18n/index';
export default function MainLayout() {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<IntlProvider locale="uk" messages={messages[3]['uk']}>
			<Layout>
				<Sidebar></Sidebar>
				<Layout>
					<Header intl={messages[0]} />
					<Content
						style={{
							margin: '24px 16px 0',
						}}
					>
						<div
							style={{
								padding: 24,
								minHeight: '100vh',
								background: colorBgContainer,
								borderRadius: borderRadiusLG,
							}}
						>
							content
						</div>
					</Content>
					<Footer intl={messages[1]}>
						Ant Design ©{new Date().getFullYear()} Created by Ant UED
					</Footer>
				</Layout>
			</Layout>
		</IntlProvider>
	);
}
