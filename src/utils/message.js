import { render, createVNode, createApp } from 'vue';
import MusicMessage from '@/components/library/music-message';

// DOM消息容器
const div = document.createElement('div');
div.setAttribute('class', 'messageNode');

let timer = null;

export default ({ type, message }) => {
	const app = createApp(MusicMessage, {
		type,
		message,
	});
	if (div.children[0]) {
		app.unmount(div);
		clearTimeout(timer);
		document.body.removeChild(div);
	}
	app.mount(div);
	// const VNode = createVNode(MusicMessage, { type, message });
	// render(VNode, div);
	document.body.appendChild(div);
	timer = setTimeout(() => {
		// render(null, div);
		app.unmount(div);
		document.body.removeChild(div);
	}, 3500);
};
