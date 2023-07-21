<template>
	<div class="container overflow" ref="appContainer">
		<AppSidebar />
		<div class="main-container">
			<AppHeader />
			<router-view v-slot="{ Component }">
				<transition name="fade" appear>
					<component :is="Component" />
				</transition>
			</router-view>
			<AppProgress />
		</div>
		<AppLyrics />
		<MusicDialog />
		<AppAudio />
		<Teleport to="#app">
			<Transition name="more-actions">
				<AppLogin v-if="$store.state.user.isShowLoginPanel && $store.state.user.status === 1" />
			</Transition>
		</Teleport>
	</div>
</template>

<script>
import AppSidebar from '@/components/app-sidebar';
import AppHeader from '@/components/app-header';
import AppProgress from '@/components/app-progress';
import AppLyrics from '@/views/Lyrics';
import MusicDialog from '@/components/library/music-dialog';
import AppLogin from '@/components/app-login';
import AppAudio from '@/views/Audio';
import message from '@/utils/message';
import { loginTourist } from '@/api/login';
import { getCookie, setCookie } from '@/utils/cookie';
import { useStore } from 'vuex';
import { onMounted, ref, provide, onUnmounted } from 'vue';
import emitter from '@/utils/bus';
import historyPlay from '@/utils/historyPlay';
export default {
	name: 'Layout',
	components: {
		AppSidebar,
		AppHeader,
		AppProgress,
		AppLyrics,
		MusicDialog,
		AppAudio,
		AppLogin,
	},
	setup() {
		const store = useStore();
		const isFull = ref(false);
		const appContainer = ref(null);
		provide('isFull', isFull);
		// 用户状态
		const getUserStatus = async () => {
			try {
				const result = await store.dispatch('user/userStatus');
				store.dispatch('user/userVIPinfo'); // 用户vip信息
				store.dispatch('user/userInfo', result); // 登录获取用户信息
				store.dispatch('user/userLike', result); // 获取用户喜欢歌曲
			} catch (error) {
				message({ type: 'warn', message: '您当前的状态为游客，登录后使用更多功能！' });
			}
		};
		onMounted(() => {
			historyPlay();
			// 全屏
			emitter.on('enlarge', () => {
				const full = document.fullscreenElement;
				// 判断是否有元素进入全屏
				if (full) {
					document.exitFullscreen();
					isFull.value = false;
				} else {
					appContainer.value.requestFullscreen();
					isFull.value = true;
				}
			});
			// 取消全屏
			emitter.on('closePanel', () => {
				const full = document.fullscreenElement;
				// 判断是否有元素进入全屏 有则退出全屏
				if (full) {
					document.exitFullscreen();
					isFull.value = false;
					setTimeout(() => {
						store.commit('song/SHOWLYRICS', false);
					}, 500);
					return;
				}
				store.commit('song/SHOWLYRICS', false);
			});
			// 判断当前是否存在cookie
			if (!getCookie()) {
				// 不存在直接游客登录
				loginTourist().then(data => {
					setCookie(data.data.cookie, 0);
				});
			}
			getUserStatus();
		});
		onUnmounted(() => {
			emitter.off(['enlarge', 'closePanel']);
		});
		return { appContainer };
	},
};
</script>

<style lang="less">
.container {
	display: flex;
	width: 100vw;
	height: 100vh;
	.main-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-width: 790px;
		max-width: 1536px;
		margin: 0 auto;
	}
}

/* 进入的起点,离开的终点 */
.fade-enter-from,
.fade-leave-to {
	transform: translateX(1rem);
	opacity: 0;
}
/* 进入进行时,离开进行时 */
.fade-enter-active {
	transition: all 0.5s;
}

/* 进入的终点,离开的起点 */
.fade-enter-to,
.fade-leave {
	transform: translateX(0px);
	opacity: 1;
}
</style>
