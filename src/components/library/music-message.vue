<template>
	<transition name="message">
		<div class="music-message" v-show="visible">
			<i class="iconfont" :style="style[type]" :class="style[type].ico"></i>
			<p>{{ message }}</p>
		</div>
	</transition>
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
	name: 'MusicMessage',
	props: {
		type: {
			type: String,
			default: 'success',
		},
		message: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const visible = ref(false);
		const style = {
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
		onMounted(() => {
			visible.value = true;
			setTimeout(() => {
				visible.value = false;
			}, 3000);
		});
		return { visible, style };
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
	width: 24rem;
	height: 3rem;
	padding: 0 1rem;
	border-radius: 0.3rem;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	z-index: 9999;
	i {
		width: 7%;
		font-size: 0.9rem;
	}
	p {
		font-size: 0.85rem;
	}
}

.message-enter-from,
.message-leave-to {
	transform: translate3d(-50%, -2rem, 0);
	opacity: 0;
}
.message-enter-active,
.message-leave-active {
	transition: all 0.5s;
}
.message-enter-to,
.message-leave-from {
	transform: translate3d(-50%, 0, 0);
	opacity: 1;
}
</style>
