import axios from "axios";
import { BASE_URL } from "../utils/constants";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {},
});

instance.interceptors.request.use(function (config) {
  return config;
});

// instance.interceptors.response.use(
// 	function (response) {
// 		console.log('🚀 ~ response:', response);
// 		return response;
// 	},
// 	function (error) {
// 		if (error.response.status !== 401) {
// 			return Promise.reject(error);
// 		}
// 		axios.interceptors.response.eject(interceptor);
// 		return axios
// 			.post('/oauth2/access_token', {
// 				refresh_token: localStorage.getItem('refresh_token'),
// 				grant_type: 'refresh_token',
// 			})
// 			.then((response) => {
// 				localStorage.setItem('access_token', response.data.access_token);
// 				localStorage.setItem('refresh_token', response.data.refresh_token);

// 				error.response.config.headers['Authorization'] = `Bearer ${response.data.access_token}`;

// 				return axios(error.response.config);
// 			})
// 			.catch((error) => {
// 				return Promise.reject(error);
// 			});
// 	}
// );

class AuthService {
  async getTokens() {
    const formData = new FormData();
    formData.append("client_id", "login-service-client-id");
    formData.append("grant_type", "password");
    formData.append("username", "annnaan1234");
    formData.append("password", "cuibap");
    formData.append("token_type", "jwt");
    fetch("http://local.edly.io/oauth2/access_token", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    console.log("🚀 ~ AuthService ~ getTokens ~ data:", data);

    const { access_token, refresh_token, expires_in } = data.data;
    return { access_token, refresh_token, expires_in };
  }
}
export default AuthService;
