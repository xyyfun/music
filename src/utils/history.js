/**
 * @Date         : 2023-05-09 23:11:13
 * @description  : 设置历史搜索
 * @param         {*} val:
 * @return        {*}
 */
export const setHistorySearch = val => localStorage.setItem('historySearch', JSON.stringify(val));

/**
 * @Date         : 2023-05-09 23:10:58
 * @description  : 获取历史搜索
 * @return        {*}
 */
export const getHistorySearch = () => {
	return JSON.parse(localStorage.getItem('historySearch')) || [];
};
