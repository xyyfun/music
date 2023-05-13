import { render, createVNode } from 'vue';
import MusicMessage from '@/components/library/music-message';

let timer = null;
let mountNode = null;
const messageDefaults = {
	duration: 3000,
	id: '',
	message: '',
	onClose: undefined,
	showClose: false,
	type: 'warn',
	offset: 16,
	zIndex: 0,
	repeatNum: 1,
};

export default options => {
	const messageProps = {
		type: options.type || messageDefaults.type,
		message: options.message || messageDefaults.message,
		duration: options.duration || messageDefaults.duration,
	};
	//确保只存在一个弹框，如果前一个弹窗还在，就移除
	if (mountNode) {
		document.body.removeChild(mountNode);
		mountNode = null;
		clearTimeout(timer);
	}
	const app = createVNode(MusicMessage, { messageProps });
	mountNode = document.createElement('div');
	render(app, mountNode);
	document.body.appendChild(mountNode);
	timer = setTimeout(() => {
		render(null, mountNode);
		document.body.removeChild(mountNode);
		mountNode = null;
		clearTimeout(timer);
	}, messageProps.duration + 500);
};
