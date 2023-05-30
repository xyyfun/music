<template>
	<transition name="message-fade">
		<div class="music-message" v-show="visible" :style="{ color: fontColor }">
			<i class="iconfont" :class="[typeStyle[messageProps.type].ico]"></i>
			<p class="ellipsis">{{ messageProps.message }}</p>
		</div>
	</transition>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
export default {
	name: 'MusicMessage',
	props: {
		messageProps: {
			type: Object,
			default: () => {},
		},
	},
	setup(props) {
		const timer = ref(null);
		const visible = ref(false);

		const typeStyle = {
			// 成功
			success: {
				ico: 'icon-success',
				color: '#67c23a',
			},
			// 错误
			error: {
				ico: 'icon-error',
				color: '#f56c6c',
			},
			// 警告
			warn: {
				ico: 'icon-warn',
				color: '#e6a23c',
			},
		};

		const fontColor = computed(() => typeStyle[props.messageProps.type].color);

		const startTimer = () => {
			timer.value = setTimeout(() => {
				visible.value = false;
				clearTimeout(timer.value);
			}, props.messageProps.duration);
		};
		onMounted(() => {
			visible.value = true;
			startTimer();
		});
		return { visible, typeStyle, fontColor };
	},
};
</script>

<style lang="less" scoped>
.music-message {
	position: fixed;
	top: 3rem;
	left: 50%;
	transform: translate3d(-50%, 0, 0);
	display: flex;
	align-items: center;
	max-width: 30rem;
	height: 3rem;
	padding: 0 2rem;
	border-radius: 0.3rem;
	background-color: var(--global-bg2);
	backdrop-filter: blur(5px);
	box-shadow: 0 0 5px var(--shadow-black);
	z-index: 9999;
	i {
		font-size: 0.9rem;
		margin-right: 0.5rem;
	}
	p {
		font-size: 0.85rem;
	}
}

.message-fade-enter-from,
.message-fade-leave-to {
	transform: translate3d(-50%, -2rem, 0);
	opacity: 0;
}
.message-fade-enter-active,
.message-fade-leave-active {
	transition: all 0.5s;
}
.message-fade-enter-to,
.message-fade-leave-from {
	transform: translate3d(-50%, 0, 0);
	opacity: 1;
}
</style>
