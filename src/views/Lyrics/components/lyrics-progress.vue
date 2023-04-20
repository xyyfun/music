<template>
	<div class="lyrics-progress">
		<div class="progress">
			<!-- 滑动 -->
			<div class="slider" ref="slot">
				<!-- 槽 -->
				<div class="slot">
					<!-- 滑块 -->
					<div class="trigger" :style="{ transform: `translateX(${trigger}px)` }"></div>
					<!-- 播放进度 -->
					<div class="complete" :style="{ transform: `scaleX(${nowProgress})` }"></div>
				</div>
			</div>
			<div class="info">
				<div class="operation">
					<a href="javascript:;" v-if="isLike" @click="cancelLike">
						<i class="iconfont icon-xihuan2" title="取消喜欢"></i>
					</a>
					<a href="javascript:;" v-else @click="like">
						<i class="iconfont icon-xihuan21" title="喜欢"></i>
					</a>
					<a href="javascript:;" title="下载该歌曲"><i class="iconfont icon-xiazai"></i></a>
					<a href="javascript:;" title="更多"><i class="iconfont icon-gengduo"></i></a>
					<a href="javascript:;" @click="comment" title="评论">
						<i class="iconfont icon-pinglun1"></i>
					</a>
				</div>
				<AppControl />
				<div class="more">
					<span class="time">{{ nowTime }}/{{ totalTimeMin || '00:00' }}</span>
					<a
						href="javascript:;"
						title="播放队列"
						@click="$store.commit('song/handlerDialog', true)">
						<i class="iconfont icon-list"></i>
						<span class="num" v-if="playlistNumber">{{ playlistNumber }}</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useClick } from '@/hooks/useProgress';
import AppControl from '@/components/app-control';
import message from '@/utils/message';
export default {
	name: 'LyricsProgress',
	components: { AppControl },
	setup() {
		const store = useStore();
		const router = useRouter();
		const slot = ref(null);
		const totalTimeS = computed(() => store.state.song.totalDuration);
		const currentMusicID = computed(() => store.state.song.currentMusicID);
		const nowProgress = computed(() => store.state.song.nowProgress);
		// 滑块位置
		const trigger = computed(() => {
			if (slot.value) return nowProgress.value * slot.value.offsetWidth;
		});
		const { x } = useClick(slot, totalTimeS);
		watch(
			x,
			newVal => {
				if (newVal) store.commit('song/DURATION', newVal);
			},
			{ immediate: true }
		);
		// 查看评论
		const comment = () => {
			if (currentMusicID.value) {
				router.push(`/comment`);
				store.commit('song/SHOWLYRICS', false);
			}
		};
		// 当前歌曲是否为我喜欢的歌曲
		const isLike = computed(() => {
			const playlist = computed(() => store.state.song.playlist);
			let flag = false;
			playlist.value.forEach(e => {
				if (e.id === currentMusicID.value) if (e.isLike) flag = true;
			});
			return flag;
		});
		// 喜欢音乐
		const like = async () => {
			if (currentMusicID.value) {
				try {
					await store.dispatch('playlist/changUserLike', {
						id: currentMusicID.value,
						boolean: true,
					});
					store.commit('song/changPlaylistLike', {
						id: currentMusicID.value,
						boolean: true,
					});
					message({ type: 'success', message: '已添加到我喜欢的音乐！' });
				} catch (error) {
					message({ type: 'error', message: error.data.message });
				}
			}
		};
		// 取消喜欢
		const cancelLike = async () => {
			if (currentMusicID.value) {
				try {
					await store.dispatch('playlist/changUserLike', {
						id: currentMusicID.value,
						boolean: false,
					});
					store.commit('song/changPlaylistLike', {
						id: currentMusicID.value,
						boolean: false,
					});
					message({ type: 'success', message: '已取消喜欢！' });
				} catch (error) {
					message({ type: 'error', message: error.data.message });
				}
			}
		};
		return {
			slot,
			comment,
			trigger,
			nowProgress,
			cancelLike,
			like,
			isLike,
			totalTimeMin: computed(() => store.state.song.url.time),
			nowTime: computed(() => store.state.song.nowTime),
			playlistNumber: computed(() => store.state.song.playlist.length),
		};
	},
};
</script>

<style lang="less" scoped>
.lyrics-progress {
	width: 100%;
	.progress {
		width: 100%;
		padding: 0 3rem;
		.slider {
			display: flex;
			align-items: center;
			height: 0.71rem;
			cursor: pointer;
			.slot {
				position: relative;
				width: 100%;
				height: 2px;
				background-color: rgba(0, 0, 0, 0.2);
				.trigger {
					position: absolute;
					top: -3px;
					left: -4px;
					width: 8px;
					height: 8px;
					background-color: #1ece9b;
					border-radius: 50%;
					transition: all 0.2s;
				}
				.complete {
					height: 2px;
					background-color: #1ece9b;
					transition: all 0.2s;
					transform-origin: left;
				}
			}
		}
		.info {
			display: flex;
			height: 5rem;
			> div {
				flex: 1;
				display: flex;
				align-items: center;
			}
			.operation {
				a {
					color: hsla(0, 0%, 88.2%, 0.8);
					i {
						font-size: 1rem;
						margin: 0 0.5rem;
						&:hover {
							color: #1ecc94;
						}
					}
					.icon-xihuan2 {
						color: #ff6664 !important;
					}
				}
			}
			.more {
				justify-content: right;
				color: hsla(0, 0%, 88.2%, 0.8);
				a {
					color: hsla(0, 0%, 88.2%, 0.8);
					&:hover {
						color: #1ecc94;
					}
				}
			}
		}
	}
}
</style>
