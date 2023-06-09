import axios from 'axios';
import message from '@/utils/message';

// 创建axios实例
const instance = axios.create({
	// 基础路径
	baseURL: 'https://service-nsjbrcma-1317235276.gz.apigw.tencentcs.com/release/',
	// baseURL: 'http://localhost:3000/',
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
		config.data = {
			cookie: document.cookie,
		};
		config.method = 'post';
		if (config.url.indexOf('?') === -1) {
			config.url = config.url + '?timestamp=' + Date.now();
		} else {
			config.url = config.url + '&timestamp=' + Date.now();
		}
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
		if (error.response.status === 400) {
			const code = error.response.data.code;
			if (code === -462) {
				message({ type: 'error', message: error.response.data.data.blockText });
			} else if (code === -460) {
				message({ type: 'error', message: error.response.data.message });
			}
		}
		return Promise.reject(error);
	}
);

export default instance;
