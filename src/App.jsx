import React, { useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import AuthService from './api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { storeAccessToken, storeRefreshToken } from './store/slices/authSlice';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			const authService = new AuthService();
			const { access_token, refresh_token, expires_in } = await authService.getTokens();
			dispatch(storeAccessToken(access_token));
			dispatch(storeRefreshToken(refresh_token));
		})();
	});
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}></Route>
			<Route path="login" element={<Login />}></Route>
		</Routes>
	);
};
export default App;
