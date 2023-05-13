import request from '@/utils/request';

/**
 * @Date         : 2023-04-11 19:52:47
 * @description  : 刷新登录
 * @return        {*}
 */
export const loginRefresh = () => request({ url: '/login/refresh', method: 'get' });

/**
 * @Date         : 2023-04-11 19:56:22
 * @description  : 游客登录
 * @return        {*}
 */
export const loginTourist = () => request({ url: `/register/anonimous`, method: 'get' });

/**
 * @Date         : 2023-04-12 14:27:49
 * @description  : 生成二维码key
 * @return        {*}
 */
export const QRkey = () => {
	return request({
		url: `/login/qr/key?timestamp=${Date.now()}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-12 14:29:10
 * @description  : 根据key值生成二维码图片的 base64 和二维码信息
 * @param         {*} key: 上方接口返回的key值
 * @return        {*}
 */
export const QRbase = key => {
	return request({
		url: `/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-12 14:33:02
 * @description  : 查询二维码状态
 * @param         {*} key:生成二维码key接口返回的key值
 * @return        {*} 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
 */
export const QRstate = key => {
	return request({
		url: `/login/qr/check?key=${key}&timestamp=${Date.now()}`,
		method: 'get',
	});
};

/**
 * @Date         : 2023-04-12 18:07:00
 * @description  : 退出登录
 * @return        {*}
 */
export const logout = () => {
	return request({
		url: '/logout',
		method: 'get',
	});
};
