/**
 * @Date         : 2023-04-01 20:49:34
 * @description  : 歌词整理
 * @param         {*} val:
 * @return        {*}
 */
export default function tidy(val) {
	if (!val) return;
	return conversionLrc(val);
	function conversionLrc(val) {
		let arrLrc = val.split('\n');
		let result = [];
		arrLrc.forEach(e => {
			let arr = e.split(']');
			let objLrc = {
				time: seconds(arr[0].substring(1)),
				lyrics: arr[1],
			};
			result.push(objLrc);
		});
		return result;
	}

	function seconds(time) {
		let arr = time.split(':');
		return arr[0] * 60 + +arr[1];
	}
}
