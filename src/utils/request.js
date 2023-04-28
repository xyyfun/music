import axios from 'axios';
import message from '@/utils/message';

// 创建axios实例
const instance = axios.create({
	// 基础路径
	baseURL: '/api',
	/*
	  *请求API为本地时将baseURL路径替换为http://localhost:3000/
		!Vercel/腾讯云部署时请配置代理
	 */
	// 超时时间
	timeout: 10000,
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
		// if (response.data.code === 400) return Promise.reject('error');
		return response;
	},
	error => {
		console.log(error);
		// if (error.response.status === 400) {
		// 网络拥挤
		// message({ type: 'error', message: '当前网络拥挤，请稍后再试！' });
		// }
		return Promise.reject(error);
	}
);

export default instance;
