<template>
	<div class="control">
		<div
			class="switching-mode"
			ref="popupElement"
			@click="isShowPopup = true"
			:class="{ active: isShowLyrics }">
			<transition name="popup">
				<AppPlayOrder v-if="isShowPopup" />
			</transition>
			<i class="iconfont" :class="order" title="播放顺序"></i>
		</div>
		<div class="switch" :class="{ active: isShowLyrics }">
			<i class="iconfont icon-shangyishou" title="上一首" @click="switchSong(false)"></i>
			<i class="iconfont icon-bofang2" title="播放" v-if="!isPlay" @click="changPlay(true)"></i>
			<i class="iconfont icon-zanting" title="暂停" v-else @click="changPlay(false)"></i>
			<i class="iconfont icon-xiayishou" title="下一首" @click="switchSong(true)"></i>
		</div>
		<div
			class="vol"
			ref="soundElement"
			:class="{ active: isShowLyrics }"
			@click="isShowSound = true">
			<transition name="popup">
				<AppSound v-if="isShowSound" />
			</transition>
			<i class="iconfont" :class="icon" title="音量"></i>
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { musicPositionLoop, musicPositionRandom } from '@/utils/usePosition';
import AppPlayOrder from '@/components/app-play-order';
import AppSound from '@/components/app-sound';
import { onClickOutside } from '@vueuse/core';
export default {
	name: 'AppControl',
	components: { AppPlayOrder, AppSound },
	setup() {
		const store = useStore();
		const soundElement = ref(null);
		const popupElement = ref(null);
		const isShowSound = ref(false);
		const isShowPopup = ref(false);
		const playlist = computed(() => store.state.song.playlist);
		const currentMusicID = computed(() => store.state.song.currentMusicID);
		const playOrder = computed(() => store.state.song.playOrder);
		// 播放顺序
		const order = computed(() => {
			const id = store.state.song.playOrder;
			if (id === 1) {
				return 'icon-liebiao';
			} else if (id === 2) {
				return 'icon-shunxu';
			} else if (id === 3) {
				return 'icon-danqu';
			} else {
				return 'icon-suiji';
			}
		});
		const icon = computed(() => {
			const volume = computed(() => store.state.song.volume);
			if (volume.value === 0) {
				return 'icon-jingyin';
			} else if (volume.value <= 50) {
				return 'icon-yinliang1';
			} else if (volume.value <= 100) {
				return 'icon-yinliang2';
			}
		});
		// 暂停或播放
		const changPlay = bol => store.commit('song/ISPLAY', bol);
		// 切换歌曲
		const switchSong = bol => {
			if (currentMusicID.value) {
				store.commit('song/ISPLAY', false);
				let id = null;
				// 4为随机播放
				if (playOrder.value === 4) {
					id = musicPositionRandom(playlist, currentMusicID);
				} else {
					id = musicPositionLoop(playlist, currentMusicID, bol);
				}
				store.commit('song/clearData');
				store.dispatch('song/getMusic', id);
			}
		};
		onClickOutside(soundElement, () => (isShowSound.value = false));
		onClickOutside(popupElement, () => (isShowPopup.value = false));
		return {
			order,
			icon,
			soundElement,
			popupElement,
			changPlay,
			switchSong,
			isShowSound,
			isShowPopup,
			isShowLyrics: computed(() => store.state.song.isShowLyrics),
			isPlay: computed(() => store.state.song.isPlay),
		};
	},
};
</script>

<style lang="less" scoped>
.control {
	height: 100%;
	justify-content: center;
	i {
		margin: 0 0.35rem;
		font-size: 1rem;
		cursor: pointer;
		color: var(--text-default-color);
	}
	.active i {
		color: var(--text-default4-color);
	}
	.switching-mode {
		position: relative;
		i {
			font-size: 1rem;
		}
	}
	.switch {
		i {
			font-size: 2rem;
			&:nth-child(2) {
				color: var(--theme-color);
				font-size: 2.2rem;
			}
		}
	}
	.vol {
		position: relative;
	}
}
/* 进入的起点,离开的终点 */
.popup-enter-from,
.popup-leave-to {
	transform: translateY(-10px);
	opacity: 0;
}
/* 进入进行时,离开进行时 */
.popup-enter-active,
.popup-leave-active {
	transition: all 0.5s;
}

/* 进入的终点,离开的起点 */
.popup-enter-to,
.popup-leave {
	transform: none;
	opacity: 1;
}
</style>
