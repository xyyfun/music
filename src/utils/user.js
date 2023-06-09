/**
 * @Date         : 2023-04-12 17:49:46
 * @description  : 设置/存储用户信息
 * @param         {*} val:
 * @return        {*}
 */
export const setUserInfo = (val = {}) => localStorage.setItem('userInfo', JSON.stringify(val));

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
 * @Date         : 2023-04-19 15:10:18
 * @description  : 设置用户喜欢
 * @param         {*} val:
 * @return        {*}
 */
export const setUserLike = (val = []) => localStorage.setItem('userLike', JSON.stringify(val));

/**
 * @Date         : 2023-04-19 15:11:57
 * @description  : 获取用户喜欢
 * @return        {*}
 */
export const getUserLike = () => JSON.parse(localStorage.getItem('userLike')) || [];

/**
 * @Date         : 2023-04-12 17:50:44
 * @description  : 移除用户信息
 * @return        {*}
 */
export const removeUserInfo = () => localStorage.clear();
