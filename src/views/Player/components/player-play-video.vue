<template>
	<div class="play-video">
		<div class="display-area" ref="videoContent" @mousemove="enterArea" @mouseleave="leaveArea">
			<div :class="isVisible ? 'default' : 'isLeave'" :style="isVisible ? '' : style" ref="target">
				<video :src="url" ref="vid" @click="playVideo"></video>
			</div>
			<transition name="progress">
				<div class="video-progress" v-show="isShowProgress">
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
							<div class="msg">
								<div class="control">
									<a
										href="javascript:;"
										v-if="isPlay"
										@click="$store.commit('video/ISPLAY', false)">
										<i class="iconfont icon-pause"></i>
									</a>
									<a href="javascript:;" v-else @click="$store.commit('video/ISPLAY', true)">
										<i class="iconfont icon-bofang1"></i>
									</a>
									<a href="javascript:;"><i class="iconfont icon-xiayishou"></i></a>
								</div>
								<div class="time">{{ nowTime }} / {{ totalTime }}</div>
							</div>
							<div class="utils">
								<div class="vol" @click="isShowSound = true" @mouseleave="isShowSound = false">
									<transition name="popup">
										<AppSound v-if="isShowSound" />
									</transition>
									<a href="javascript:;">
										<i class="iconfont icon-yinliang2"></i>
									</a>
								</div>
								<div class="quality">
									<a href="javascript:;">标清</a>
								</div>
								<div class="fullscreen" @click="fullscreen">
									<a href="javascript:;" title="取消全屏" v-if="isFullscreen">
										<i class="iconfont icon-quxiaoquanping"></i>
									</a>
									<a href="javascript:;" title="全屏" v-else>
										<i class="iconfont icon-quanping"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import AppSound from '@/components/app-sound';
import throttle from 'lodash/throttle';
import useProgress from '@/hooks/useProgress';
import useDraggable from '@/hooks/useDraggable';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed, onMounted, ref, watch } from 'vue';
export default {
	name: 'PlayerPlayVideo',
	components: { AppSound },
	props: {
		isVisible: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const vid = ref(null); // 视频源
		const slot = ref(null); // 进度槽
		const target = ref(null);
		const trigger = ref(null); // 滑块
		const videoContent = ref(null); // 视频内容
		const route = useRoute();
		const store = useStore();
		const isShowSound = ref(false);
		const isShowProgress = ref(false);
		const isFullscreen = ref(false);
		const timer = ref(null);
		const isPlay = computed(() => store.state.video.isPlay);
		const nowProgress = computed(() => store.state.video.nowProgress); // 当前进度
		const totalDuration = computed(() => store.state.video.totalDuration); // 当前音乐总秒数
		// 滑块位置
		const triggerPosition = computed(() => {
			if (slot.value) return nowProgress.value * slot.value.offsetWidth;
		});
		// 绑定点击事件 返回点击位置的音乐秒数
		const { currentTime } = useProgress(trigger, slot, totalDuration);
		// 监视用户点击进度条 根据点击位置修改音乐进度
		watch(currentTime, newVal => store.commit('video/DURATION', newVal), { immediate: true });
		// 获取当前播放器时间
		const playTime = el => {
			if (!vid.value) return;
			const time = el.currentTime;
			console.log('视频播放中');
			store.commit('video/NOWTIME', time);
		};
		// 鼠标进入可视区
		const enterArea = throttle(() => {
			if (!isShowProgress.value) isShowProgress.value = true;
			clearTimeout(timer.value);
			timer.value = setTimeout(() => {
				isShowProgress.value = false;
				clearTimeout(timer.value);
			}, 3000);
		}, 200);
		// 鼠标离开可视区
		const leaveArea = () => {
			// isShowProgress.value = false;
			// clearTimeout(timer.value);
		};
		// 播放暂停视频
		const playVideo = () => store.commit('video/ISPLAY', !isPlay.value);
		// 全屏
		const fullscreen = () => {
			const full = document.fullscreenElement;
			// 判断是否有元素进入全屏
			if (full) {
				document.exitFullscreen();
				isFullscreen.value = false;
			} else {
				videoContent.value.requestFullscreen();
				isFullscreen.value = true;
			}
		};
		// 视频拖动
		const { style } = useDraggable(target);
		// 收尾操作
		const end = () => {
			store.commit('video/ISPLAY', false);
			store.commit('video/clearData');
		};
		// 监视路由变化获取数据
		watch(
			() => route.query.vid,
			() => {
				end();
				if (route.query.type === 'video') {
					store.dispatch('video/videoUrl', route.query.vid);
				} else {
					store.dispatch('video/mvUrl', { id: route.query.vid });
				}
			},
			{ immediate: true }
		);
		// 判断是否有音乐正在播放
		const isPlaying = () => {
			const isPlaySong = store.state.song.isPlay;
			if (isPlaySong) store.commit('song/ISPLAY', false);
		};
		onMounted(() => {
			// 视频加载至可以播放时调用
			vid.value.oncanplay = () => {
				if (!vid.value) return;
				isPlaying();
				store.commit('video/initial', { bol: true, time: vid.value.duration });
			};
			// 音频时间发生变化时调用
			vid.value.ontimeupdate = () => playTime(vid.value); // 获取播放器当前时间
			// 监视是否播放视频
			watch(
				() => store.state.video.isPlay,
				newVal => {
					if (newVal) {
						isPlaying();
						vid.value.play();
					} else {
						vid.value.pause();
					}
				}
			);
			// 监视音量变化，修改播放器音量
			watch(
				() => store.state.song.volume,
				newVal => {
					vid.value.volume = newVal / 100;
				},
				{ immediate: true }
			);
			// 监视是否修改进度，跳转至指定进度
			watch(
				() => store.state.video.duration,
				newVal => {
					vid.value.currentTime = newVal;
				}
			);
			// 音频结束调用函数
			vid.value.onended = () => {
				store.commit('video/ISPLAY', false);
			};
		});
		return {
			vid,
			slot,
			target,
			videoContent,
			nowProgress,
			trigger,
			isShowSound,
			triggerPosition,
			isShowProgress,
			isFullscreen,
			enterArea,
			leaveArea,
			playVideo,
			isPlay,
			fullscreen,
			style,
			url: computed(() => store.state.video.videoUrl),
			nowTime: computed(() => store.state.video.nowTime),
			totalTime: computed(() => store.state.video.totalTime),
		};
	},
};
</script>

<style lang="less" scoped>
.play-video {
	.display-area {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		min-height: 28rem;
		height: 28rem;
		background-color: #000;
		video {
			width: 100%;
			height: 100%;
		}
		.default {
			width: 100%;
			height: 100%;
		}
		.isLeave {
			overflow: hidden;
			position: fixed;
			right: 84px;
			bottom: 100px;
			width: 360px;
			height: 203px;
			border-radius: 0.5rem;
			cursor: move;
			background-color: #000;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
			z-index: 500;
			> video {
				pointer-events: none;
			}
		}
		.video-progress {
			position: absolute;
			bottom: 0;
			width: 100%;
			padding: 0 2rem;
			background: linear-gradient(rgba(0, 0, 0, 0), #000);
			// 进度条
			.slider {
				display: flex;
				align-items: center;
				height: 0.71rem;
				cursor: pointer;
				&:hover .slot .trigger {
					opacity: 1;
				}
				.slot {
					position: relative;
					width: 100%;
					height: 2px;
					background-color: rgba(255, 255, 255, 0.5);
					.trigger {
						opacity: 0;
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
			// 信息
			.info {
				display: flex;
				justify-content: space-between;
				height: 3rem;
				.msg {
					display: flex;
					align-items: center;
					height: 100%;
					color: var(--text-default2-color);
					.control {
						a {
							color: var(--text-default2-color);
							margin-right: 0.5rem;
							i {
								font-size: 1.5rem;
							}
						}
					}
					.time {
						margin-left: 1rem;
						font-size: 0.9rem;
					}
				}
				.utils {
					display: flex;
					align-items: center;
					height: 100%;
					.vol {
						position: relative;
						.sound {
							left: -160%;
						}
					}
					a,
					i {
						color: var(--text-default2-color);
						font-size: 0.9rem;
					}
					> div {
						margin: 0 0.5rem;
					}
				}
			}
		}
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
/* 进入的起点,离开的终点 */
.progress-enter-from,
.progress-leave-to {
	opacity: 0;
}
/* 进入进行时,离开进行时 */
.progress-enter-active,
.progress-leave-active {
	transition: opacity 0.3s;
}

/* 进入的终点,离开的起点 */
.progress-enter-to,
.progress-leave {
	opacity: 1;
}
</style>
