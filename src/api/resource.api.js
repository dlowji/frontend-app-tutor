import axios from 'axios';
import { BASE_URL_API } from '../utils/constants';
import { getAccessToken } from '../store/slices/authSlice';
import { store } from '../store';
const api = axios.create({
	baseURL: BASE_URL_API,
	timeout: 1000,
	headers: {},
});

api.interceptors.request.use(function (config) {
	const accessToken = getAccessToken(store.getState());
	if (accessToken) {
		config.headers['Authorization'] = `JWT ${accessToken}`;
	}
	return config;
});

export default api;
