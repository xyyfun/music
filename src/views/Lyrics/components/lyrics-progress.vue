<template>
	<div class="lyrics-progress">
		<LyricsVideoVisible />
		<div class="progress">
			<!-- 滑动 -->
			<div class="slider" ref="slot">
				<!-- 槽 -->
				<div class="slot">
					<!-- 滑块 -->
					<div
						class="trigger"
						ref="trigger"
						:style="{ transform: `translateX(${triggerPosition}px)` }"></div>
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
					<a href="javascript:;" class="moreActions" @click="showMore" ref="moreActions">
						<i class="iconfont icon-gengduo" title="更多"></i>
						<transition name="more-actions">
							<AppMoreActions v-if="isShowList" @closePanel="isShowList = false" :song="detail" />
						</transition>
					</a>
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
import LyricsVideoVisible from './lyrics-video-visible';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import useProgress from '@/hooks/useProgress';
import AppControl from '@/components/app-control';
import AppMoreActions from '@/components/app-more-actions';
import message from '@/utils/message';
import messageBox from '@/utils/message-box';
import { onClickOutside } from '@vueuse/core';
export default {
	name: 'LyricsProgress',
	components: { LyricsVideoVisible, AppControl, AppMoreActions },
	setup() {
		const store = useStore();
		const router = useRouter();
		const slot = ref(null);
		const trigger = ref(null);
		const moreActions = ref(null);
		const isShowList = ref(false);
		const totalTimeS = computed(() => store.state.song.totalDuration);
		const currentMusicID = computed(() => store.state.song.currentMusicID);
		const nowProgress = computed(() => store.state.song.nowProgress);
		const status = computed(() => store.state.user.status);
		// 滑块位置
		const triggerPosition = computed(() => {
			if (slot.value) return nowProgress.value * slot.value.offsetWidth;
		});
		const { currentTime } = useProgress(trigger, slot, totalTimeS);
		watch(
			currentTime,
			newVal => {
				if (newVal) store.commit('song/DURATION', newVal);
			},
			{ immediate: true }
		);
		// 查看评论
		const comment = () => {
			if (currentMusicID.value) {
				router.push(`/comment/${currentMusicID.value}`);
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
			if (status.value === 2) {
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
			} else {
				messageBox({
					title: '提示',
					message: '喜欢音乐需要先登录，是否现在登录？',
					isShowCancel: true,
				}).then(
					() => {
						store.commit('song/SHOWLYRICS', false);
						store.commit('user/changPanelStatus', true);
					},
					() => {}
				);
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
		const showMore = () => {
			// if (!currentMusicID.value) return;
			isShowList.value = true;
		};
		onClickOutside(moreActions, () => (isShowList.value = false));
		return {
			moreActions,
			isShowList,
			slot,
			comment,
			trigger,
			triggerPosition,
			nowProgress,
			cancelLike,
			like,
			isLike,
			showMore,
			totalTimeMin: computed(() => store.state.song.url.time),
			nowTime: computed(() => store.state.song.nowTime),
			playlistNumber: computed(() => store.state.song.playlist.length),
			detail: computed(() => store.state.song.detail),
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
				background-color: hsla(0, 0%, 100%, 0.2);
				.trigger {
					position: absolute;
					top: -3px;
					left: -4px;
					width: 8px;
					height: 8px;
					background-color: var(--theme-color);
					border-radius: 50%;
				}
				.complete {
					height: 2px;
					background-color: var(--theme-color);
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
				.moreActions {
					position: relative;
					.app-more-actions {
						bottom: 100%;
					}
				}
				a {
					color: hsla(0, 0%, 88.2%, 0.8);
					i {
						font-size: 1rem;
						margin: 0 0.5rem;
						&:hover {
							color: var(--theme-color);
						}
					}
					.icon-xihuan2 {
						color: var(--theme-color-like) !important;
					}
				}
			}
			.more {
				justify-content: right;
				color: hsla(0, 0%, 88.2%, 0.8);
				a {
					color: hsla(0, 0%, 88.2%, 0.8);
					&:hover {
						color: var(--theme-color);
					}
				}
			}
		}
	}
}
.more-actions-enter-from,
.more-actions-leave-to {
	transform: scale(0);
	opacity: 0;
}
.more-actions-enter-active,
.more-actions-leave-active {
	transition: all 0.2s;
	transform-origin: bottom left;
}
.more-actions-enter-to,
.more-actions-leave-from {
	transform: scale(1);
	opacity: 1;
}
</style>
