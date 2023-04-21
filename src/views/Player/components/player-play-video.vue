<template>
	<div class="play-video">
		<div class="display-area" @mousemove="enterArea" @mouseleave="leaveArea">
			<video :src="url" ref="vid" @click="playVideo"></video>
			<transition name="progress">
				<div class="video-progress" v-show="isShowProgress">
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
								<div class="vol" @mouseleave="isShowSound = false">
									<transition name="popup">
										<AppSound v-if="isShowSound" />
									</transition>
									<a href="javascript:;" @click="isShowSound = true">
										<i class="iconfont icon-yinliang2"></i>
									</a>
								</div>
								<div class="quality">
									<a href="javascript:;">标清</a>
								</div>
								<div class="enlarge">
									<a href="javascript:;">
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
import { useClick } from '@/hooks/useProgress';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
export default {
	name: 'PlayerPlayVideo',
	components: { AppSound },
	setup() {
		const vid = ref(null);
		const route = useRoute();
		const store = useStore();
		const isShowSound = ref(false);
		const isShowProgress = ref(false);
		const _timerPlay = ref(null);
		const _timerMove = ref(null);
		const slot = ref(null);
		const isPlay = computed(() => store.state.video.isPlay);
		const nowProgress = computed(() => store.state.video.nowProgress); // 当前进度
		const totalDuration = computed(() => store.state.video.totalDuration); // 当前音乐总秒数
		// 滑块位置
		const trigger = computed(() => {
			if (slot.value) return nowProgress.value * slot.value.offsetWidth;
		});
		// 绑定点击事件 返回点击位置的音乐秒数
		const { x } = useClick(slot, totalDuration);
		// 监视用户点击进度条 根据点击位置修改音乐进度
		watch(x, newVal => store.commit('video/DURATION', newVal), { immediate: true });
		const playTime = el => {
			const time = el.currentTime;
			store.commit('video/NOWTIME', time);
		};
		// 鼠标进入可视区
		const enterArea = () => {
			if (!isShowProgress.value) isShowProgress.value = true;
			clearTimeout(_timerMove.value);
			_timerMove.value = setTimeout(() => {
				isShowProgress.value = false;
			}, 3000);
		};
		// 鼠标离开可视区
		const leaveArea = () => {
			isShowProgress.value = false;
			clearTimeout(_timerMove.value);
		};
		const playVideo = () => {
			store.commit('video/ISPLAY', !isPlay.value);
		};
		// 收尾操作
		const end = () => {
			store.commit('video/ISPLAY', false);
			store.commit('video/clearData');
			clearInterval(_timerPlay.value);
		};
		// 监视路由变化获取数据
		watch(
			() => route.query.id,
			() => {
				end();
				if (route.query.type === 'video') {
					store.dispatch('video/videoUrl', route.query.id);
				} else {
					store.dispatch('video/mvUrl', { id: route.query.id });
				}
			},
			{ immediate: true }
		);
		onMounted(() => {
			// 视频加载至可以播放时调用
			vid.value.oncanplay = () => {
				console.log('可以播放了');
				store.commit('video/initial', { bol: true, time: vid.value.duration });
			};
			// 监视是否播放视频
			watch(
				() => store.state.video.isPlay,
				newVal => {
					if (newVal) {
						vid.value.play();
						_timerPlay.value = setInterval(() => {
							playTime(vid.value);
						}, 200);
					} else {
						vid.value.pause();
						clearInterval(_timerPlay.value);
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
		onBeforeUnmount(() => end());
		return {
			vid,
			slot,
			nowProgress,
			trigger,
			isShowSound,
			isShowProgress,
			enterArea,
			leaveArea,
			playVideo,
			isPlay,
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
		width: 100%;
		min-height: 28rem;
		background-color: #000;
		video {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 28rem;
		}
		.video-progress {
			position: absolute;
			bottom: 0;
			width: 100%;
			padding: 0 2rem;
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
						background-color: #1ecc94;
						border-radius: 50%;
						transition: all 0.2s;
					}
					.complete {
						height: 2px;
						background-color: #1ecc94;
						transition: all 0.2s;
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
					color: #fff;
					.control {
						a {
							color: #fff;
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
						color: #fff;
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
