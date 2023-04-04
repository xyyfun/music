<template>
	<div class="control">
		<div class="switching-mode" :class="{ active: isShowLyrics }">
			<AppPlayOrder ref="playOrderChild" />
			<i class="iconfont" :class="order" @click="changPlayOrder" title="播放顺序"></i>
		</div>
		<div class="switch" :class="{ active: isShowLyrics }">
			<i class="iconfont icon-shangyishou" title="上一首" @click="switchSong(false)"></i>
			<i class="iconfont icon-bofang2" title="播放" v-if="!isPlay" @click="changPlay(true)"></i>
			<i class="iconfont icon-zanting" title="暂停" v-else @click="changPlay(false)"></i>
			<i class="iconfont icon-xiayishou" title="下一首" @click="switchSong(true)"></i>
		</div>
		<div class="volume" :class="{ active: isShowLyrics }">
			<AppSound ref="soundChild" />
			<i class="iconfont" :class="icon" title="音量" @click="changVolume"></i>
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { musicPositionLoop, musicPositionRandom } from '@/hooks/usePosition';
import AppPlayOrder from '@/components/app-play-order';
import AppSound from '@/components/app-sound';
export default {
	name: 'AppControl',
	components: { AppPlayOrder, AppSound },
	setup() {
		const store = useStore();
		const playOrderChild = ref(null);
		const soundChild = ref(null);
		const playlist = computed(() => store.state.song.playlist);
		const currentMusicID = computed(() => store.state.song.currentMusicID);
		const playOrder = computed(() => store.state.song.playOrder);
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
		// 显示隐藏修改播放顺序
		const changPlayOrder = () => (playOrderChild.value.isShowPopup = true);
		// 显示隐藏音量
		const changVolume = () => (soundChild.value.isShowVolume = true);
		// 暂停或播放
		const changPlay = bol => {
			store.commit('song/ISPLAY', bol);
		};
		// 切换歌曲
		const switchSong = bol => {
			store.commit('song/ISPLAY', false);
			let id = null;
			if (playOrder.value === 4) {
				id = musicPositionRandom(playlist, currentMusicID);
			} else {
				id = musicPositionLoop(playlist, currentMusicID, bol);
			}
			store.dispatch('song/songUrl', id);
			store.dispatch('song/songLyrics', id);
			store.dispatch('song/songDetail', id);
		};
		return {
			playOrderChild,
			soundChild,
			order,
			icon,
			changPlayOrder,
			changVolume,
			changPlay,
			switchSong,
			totalTimeMin: computed(() => store.getters['song/totalTime']),
			isShowLyrics: computed(() => store.state.song.isShowLyrics),
			isPlay: computed(() => store.state.song.isPlay),
			nowTime: computed(() => store.state.song.nowTime),
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
		color: #000;
	}
	.active i {
		color: #fff;
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
				color: #1ecc94;
				font-size: 2.2rem;
			}
		}
	}
	.volume {
		position: relative;
	}
}
</style>
