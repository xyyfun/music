// 历史播放
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useDateFormat } from '@vueuse/core';
import message from './message';
export default function historyPlay() {
	const store = useStore();
	const currentMusicID = computed(() => store.state.song.currentMusicID);
	const isPlay = computed(() => store.state.song.isPlay);
	const playerTime = computed(() => store.state.song.playerTime);
	// 当前播放音乐
	const currentlyPlayingMusic = () => {
		if (currentMusicID.value && isPlay.value) {
			localStorage.setItem(
				'historyPlay',
				JSON.stringify({
					currentMusicID: currentMusicID.value,
					playerTime: playerTime.value,
					new: true,
				})
			);
		}
	};
	// 是否有历史播放
	const isHistoryPlay = () => {
		const historyPlay = JSON.parse(localStorage.getItem('historyPlay'));
		if (historyPlay && historyPlay.new) {
			const { currentMusicID, playerTime } = historyPlay;
			store
				.dispatch('song/getMusic', currentMusicID)
				.then(() => {
					message({
						type: 'success',
						message: `上次播放到 ${
							useDateFormat(playerTime * 1000, 'mm:ss').value
						}，已为您继续播放`,
					});
					store.commit('song/DURATION', playerTime);
					localStorage.removeItem('historyPlay');
				})
				.catch(err => {});
		}
	};
	// 监听页签关闭beforeunload
	window.addEventListener('beforeunload', () => currentlyPlayingMusic());
	window.addEventListener('load', () => isHistoryPlay());
}
