/**
 * @Date         : 2023-04-02 18:22:11
 * @description  : 拖动将距离转换百分比
 * @param         {*} el: 监视的元素
 * @param         {*} oldValue: 旧值
 * @param         {*} father: 监视元素的父元素
 * @param         {*} callback: 回调
 * @return        {*}
 */
export default function mouseDownMove(el, oldValue, father, callback) {
	el.addEventListener('mousedown', event => {
		const old = oldValue.value; // 旧值
		const elHeight = el.offsetHeight / 2; // 监视元素的宽高的一半
		const fatherHeight = father.offsetHeight; // 监视元素的父元素的长度
		document.addEventListener('mousemove', fn);
		function fn(e) {
			// 取整
			let value = Math.floor(((event.pageY + elHeight - e.pageY + old) / fatherHeight) * 100);
			if (value > 100) value = 100;
			if (value < 0) value = 0;
			callback(value);
		}
		document.addEventListener('mouseup', function () {
			document.removeEventListener('mousemove', fn);
		});
	});
}
