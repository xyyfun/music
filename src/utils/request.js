import axios from 'axios';

// 创建axios实例
const instance = axios.create({
	// 基础路径
	baseURL: 'http://localhost:3000/',
	// 超时时间
	timeout: 5000,
	// 允许携带cookie
	withCredentials: true,
});
// 请求拦截器
instance.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		console.log(error);
	}
);

// 响应拦截器
instance.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		return Promise.reject(error);
	}
);

export default instance;
