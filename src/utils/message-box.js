import MusicMessageBox from '@/components/library/music-message-box';
import { render, createVNode } from 'vue';

const defaults = {
	title: '标题',
	message: '这是一段有关内容',
	type: null, // 图标
	isShowClose: true, // 是否显示右上角关闭按钮
	isShowCancel: false, // 是否显示取消按钮
	cancelButtonText: '取消', // 取消按钮的文本内容
	confirmButtonText: '确定', // 确定按钮的文本内容
};

let mountNode = null;

// 销毁/收尾
const destroy = () => {
	render(null, mountNode);
	document.body.removeChild(mountNode);
	mountNode = null;
};

export default options => {
	const { title, message, type, isShowClose, isShowCancel, cancelButtonText, confirmButtonText } =
		options;
	const messageBoxProps = {
		title: title || defaults.title,
		message: message || defaults.message,
		type: type || defaults.type,
		isShowClose: defaults.isShowClose,
		isShowCancel: defaults.isShowCancel,
		cancelButtonText: cancelButtonText || defaults.cancelButtonText,
		confirmButtonText: confirmButtonText || defaults.confirmButtonText,
	};
	if (typeof isShowClose === 'boolean') {
		messageBoxProps.isShowClose = isShowClose;
	}
	if (typeof isShowCancel === 'boolean') {
		messageBoxProps.isShowCancel = isShowCancel;
	}
	return new Promise((resolve, reject) => {
		// 确定
		const submitCallback = () => {
			destroy();
			resolve('confirm');
		};
		// 取消
		const cancelCallback = () => {
			destroy();
			reject('close');
		};
		const app = createVNode(MusicMessageBox, { messageBoxProps, submitCallback, cancelCallback });
		mountNode = document.createElement('div');
		render(app, mountNode); // 渲染
		document.body.appendChild(mountNode); // 插入页面body
	});
};
