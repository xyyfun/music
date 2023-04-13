<template>
	<audio :src="url" ref="aud"></audio>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { musicPositionLoop, musicPositionRandom } from '@/hooks/usePosition';
export default {
	name: 'AppAudio',
	setup() {
		const aud = ref(null); // 音源
		const timer = ref(null);
		const store = useStore();
		const url = computed(() => store.getters['song/playUrl']);
		const playlist = computed(() => store.state.song.playlist);
		const currentMusicID = computed(() => store.state.song.currentMusicID);
		const playOrder = computed(() => store.state.song.playOrder);
		// 播放器当前时间
		const playTime = ele => {
			const time = ele.currentTime;
			console.log(123);
			store.commit('song/NOWTIME', time);
		};
		// 单曲循环
		const singleCycle = () => {
			setTimeout(() => {
				store.commit('song/ISPLAY', true);
			}, 1000);
		};
		// 列表循环
		const listLoop = () => {
			const id = musicPositionLoop(playlist, currentMusicID, true);
			store.dispatch('song/getMusic', id);
		};
		// 随机播放
		const randomPlay = () => {
			const id = musicPositionRandom(playlist, currentMusicID);
			store.dispatch('song/getMusic', id);
		};
		// 顺序播放
		const sequentialPlay = () => {
			const length = playlist.value.length;
			let nextID = null;
			playlist.value.forEach((e, i) => {
				if (e.id === currentMusicID.value) {
					if (length === i + 1) {
						nextID = false;
					} else {
						nextID = playlist.value[i + 1].id;
					}
				}
			});
			if (nextID) {
				store.dispatch('song/getMusic', nextID);
			} else {
				store.commit('song/clearData');
			}
			nextID = null;
		};
		onMounted(() => {
			// 音频加载可以播放时调用
			aud.value.oncanplay = function () {
				store.commit('song/initial', {
					bol: true,
					time: aud.value.duration,
				});
			};
			// 监视变化，播放或暂停音频
			watch(
				() => store.state.song.isPlay,
				newVal => {
					if (newVal) {
						aud.value.play(); // 播放
						timer.value = setInterval(() => {
							playTime(aud.value); // 获取播放器当前时间
						}, 200);
					} else {
						aud.value.pause(); // 暂停
						clearInterval(timer.value);
					}
				}
			);
			// 监视是否修改进度，跳转至指定进度
			watch(
				() => store.state.song.duration,
				newVal => {
					aud.value.currentTime = newVal;
				}
			);
			// 监视音量变化，修改播放器音量
			watch(
				() => store.state.song.volume,
				newVal => {
					aud.value.volume = newVal / 100;
				},
				{ immediate: true }
			);
			// 音频结束调用函数
			aud.value.onended = function () {
				store.commit('song/ISPLAY', false);
				if (playOrder.value === 1) {
					listLoop();
				} else if (playOrder.value === 2) {
					sequentialPlay();
				} else if (playOrder.value === 3) {
					// 单曲循环
					aud.value.load(); // 重新加载音频
				} else if (playOrder.value === 4) {
					randomPlay();
				}
			};
		});
		return {
			aud,
			url,
		};
	},
};
</script>

<style></style>
