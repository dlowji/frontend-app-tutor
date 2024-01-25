import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { Layout, theme } from 'antd';
const { Content } = Layout;
import { IntlProvider } from '@edx/frontend-platform/i18n';
import Header from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';
import messages from '../../i18n/index';
import {
	configure,
	fetchAuthenticatedUser,
	getAuthenticatedHttpClient,
	hydrateAuthenticatedUser,
	getAuthenticatedUser,
} from '@edx/frontend-platform/auth';

import { getConfig } from '@edx/frontend-platform';
import MainContent from './MainContent';

export default function MainLayout() {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	useEffect(() => {
		(async () => {
			// Will contain additional user informatio
			async function postData(url = 'http://local.edly.io/oauth2/access_token') {
				// Default options are marked with *
				const formData = new FormData();
				formData.append('client_id', 'login-service-client-id');
				formData.append('grant_type', 'password');
				formData.append('username', 's1mpleow');
				formData.append('password', 'ka260102');
				formData.append('token_type', 'jwt');
				fetch(url, {
					method: 'POST', // *GET, POST, PUT, DELETE, etc.
					headers: {
						//   "Content-Type": "multipart/form-data",
					},
					// mode: "cors",
					body: formData,
				})
					.then((response) => response.json())
					.then((data) => {
						const accessToken = data.access_token;
						fetch('http://local.edly.io/api/user/v1/accounts/s1mpleow', {
							method: 'GET', // *GET, POST, PUT, DELETE, etc.
							headers: {
								Authorization: `JWT ${accessToken}`,
							},
						})
							.then((response) => response.json())
							.then((data) => {
								console.log(data);
							});
					});
			}
			postData();
		})();
	}, []);

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
							<MainContent />
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
