/**
 * @Date         : 2023-04-12 15:57:07
 * @description  : 存储cookie
 * @param         {*} val: cookie
 * @param         {*} status:状态 0：游客 1：登录用户
 * @return        {*}
 */
export const setCookie = (val, status) => {
	if (status) {
		const cookie = val.replace(/\s*/g, '');
		// 获取MUSIC_U之后所有字符
		const str = cookie.substring(cookie.indexOf('MUSIC_U'));
		// 截取MUSIC_U至HTTPOnly间字符
		const MUSIC_U = str.substring(0, str.indexOf('HTTPOnly'));
		document.cookie = MUSIC_U;
	} else {
		const cookie = val.replace(/\s*/g, '');
		const array = cookie.split(';;');
		array.forEach(e => (document.cookie = e));
	}
};

/**
 * @Date         : 2023-04-11 20:44:51
 * @description  : 获取cookie
 * @return        {*}
 */
export const getCookie = () => document.cookie;

/**
 * @Date         : 2023-04-12 15:59:25
 * @description  : 移除cookie
 * @return        {*}
 */
export const removeCookie = () => {
	const cookie = document.cookie.replace(/\s*/g, '');
	const array = cookie.split(';');
	const new_data = new Date(Date.now() - 24 * 60 * 60 * 1000);
	array.forEach(e => {
		document.cookie = `${e};Expires=${new_data.toUTCString()};Path=/`;
	});
};
