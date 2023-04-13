export default function (num) {
	const length = num.toString().length; // 数据长度
	if (length <= 4) {
		// 千单位
		return (num / 1000).toFixed(2) + '千';
	} else if (length <= 8) {
		// 千-千万
		return (num / 10000).toFixed(2) + '万';
	} else {
		// 亿
		return (num / 100000000).toFixed(2) + '亿';
	}
}
