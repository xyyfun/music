import { onMounted, onUnmounted, reactive } from 'vue';

/**
 * @Date         : 2023-05-24 17:00:08
 * @description  : 使用拖动
 * @param     		{*} el : 绑定元素
 * @return        {*}
 */
export default el => {
	const style = reactive({
		right: '84px',
		bottom: '100px',
	});
	const _mousedown = event => {
		const _mousemove = e => {
			style.top = e.clientY - event.offsetY + 'px';
			style.left = e.clientX - event.offsetX + 'px';
		};
		const _mouseup = () => {
			document.removeEventListener('mousemove', _mousemove);
			document.removeEventListener('mouseup', _mouseup);
			event.preventDefault();
		};
		document.addEventListener('mousemove', _mousemove);
		document.addEventListener('mouseup', _mouseup);
	};
	onMounted(() => {
		if (el.value) el.value.addEventListener('mousedown', _mousedown);
	});
	onUnmounted(() => {
		document.removeEventListener('mousedown', _mousedown);
	});
	return {
		style,
	};
};
