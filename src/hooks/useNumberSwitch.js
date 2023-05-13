import { ref } from 'vue';
export default function (num) {
	const count = ref(null);
	const length = num.toString().length; // 数据长度
	if (length < 4) {
		count.value = num;
	} else if (length === 4) {
		// 千单位
		count.value = (num / 1000).toFixed(2) + '千';
	} else if (length <= 8) {
		// 千-千万
		count.value = (num / 10000).toFixed(2) + '万';
	} else {
		// 亿
		count.value = (num / 100000000).toFixed(2) + '亿';
	}
	return count;
}
