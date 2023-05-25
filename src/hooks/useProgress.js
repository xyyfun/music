import { ref, onMounted, onUnmounted } from 'vue';

/**
 * @Date         : 2023-05-21 17:55:00
 * @description  : 使用进度
 * @param         {*} target: HTMLElement
 * @param         {*} slot: HTMLElement
 * @param         {*} params: 当前歌曲总秒数
 * @return        {*}
 */

export default (target, slot, params) => {
	// x负责控制音乐进度
	// y负责控制音量
	const currentTime = ref(0);
	const sound = ref(0);
	function chnagProgress(e) {
		const width = slot.value.offsetWidth;
		const height = slot.value.offsetHeight;
		const left = slot.value.getBoundingClientRect().left; // 元素相对于body左边的距离
		const top = slot.value.getBoundingClientRect().top + height; // 元素相对于body顶部的距离
		// 点击的进度条百分比位置 = 点击位置/总长度 * 100
		let percentageX = ((e.clientX - left) / width) * 100;
		let percentageY = Math.floor(((top - e.clientY) / height) * 100);
		if (percentageX < 0) percentageX = 0;
		if (percentageX > 100) percentageX = 100;
		if (percentageY < 0) percentageY = 0;
		if (percentageY > 100) percentageY = 100;
		// 点击位置的音乐秒数 = 点击的进度条百分比位置 / 100 * 音乐总秒数
		currentTime.value = (percentageX / 100) * params.value;
		sound.value = percentageY;
	}
	// 点击事件
	const _click = e => chnagProgress(e);
	// 拖拽事件
	const _mousedown = event => {
		event.preventDefault();
		// 鼠标移动
		const _mousemove = e => chnagProgress(e);
		// 鼠标抬起
		const _mouseup = () => {
			document.removeEventListener('mousemove', _mousemove);
			document.removeEventListener('mouseup', _mouseup);
		};
		document.addEventListener('mousemove', _mousemove);
		document.addEventListener('mouseup', _mouseup);
	};
	onMounted(() => {
		if (slot.value) slot.value.addEventListener('click', _click);
		if (target.value) target.value.addEventListener('mousedown', _mousedown);
	});
	onUnmounted(() => {
		// 销毁
		document.removeEventListener('click', _click);
		document.removeEventListener('mousedown', _mousedown);
	});
	return { currentTime, sound };
};
