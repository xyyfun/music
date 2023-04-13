/**
 * @Date         : 2023-04-12 15:57:07
 * @description  : 存储cookie
 * @param         {*} val:
 * @return        {*}
 */
export const setCookie = val => {
	if (val) {
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
