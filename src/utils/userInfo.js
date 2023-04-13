/**
 * @Date         : 2023-04-12 17:49:46
 * @description  : 设置/存储用户信息
 * @param         {*} val:
 * @return        {*}
 */
export const setUserInfo = val => localStorage.setItem('userInfo', JSON.stringify(val));

/**
 * @Date         : 2023-04-12 17:50:22
 * @description  : 获取用户信息
 * @return        {*}
 */
export const getUserInfo = () => {
	let userInfo = localStorage.getItem('userInfo');
	return JSON.parse(userInfo);
};

/**
 * @Date         : 2023-04-12 17:50:44
 * @description  : 移除用户信息
 * @return        {*}
 */
export const removeUserInfo = () => localStorage.removeItem('userInfo');
