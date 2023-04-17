import { ref, onMounted, onUnmounted } from 'vue';

// 点击
export const useClick = (el, param) => {
	// x负责控制音乐进度
	// y负责控制音量
	const x = ref(0);
	const y = ref(0);
	const click = e => {
		const width = el.value.offsetWidth;
		const height = el.value.offsetHeight;
		const left = el.value.getBoundingClientRect().left; // 元素相对于body左边的距离
		const top = el.value.getBoundingClientRect().top + height; // 元素相对于body顶部的距离
		// 点击的进度条百分比位置 = 点击位置/总长度 * 100
		const percentageX = ((e.pageX - left) / width) * 100;
		let percentageY = Math.floor(((top - e.pageY) / height) * 100);
		// 点击位置的音乐秒数 = 点击的进度条百分比位置 / 100 * 音乐总秒数
		x.value = (percentageX / 100) * param.value;
		if (percentageY < 0) percentageY = 0;
		if (percentageY > 100) percentageY = 100;
		y.value = percentageY;
	};
	onMounted(() => {
		if (el.value) el.value.addEventListener('click', click);
	});
	onUnmounted(() => {
		document.removeEventListener('click', click);
	});
	return { x, y };
};
