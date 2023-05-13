<template>
	<div class="app-progress">
		<div class="progress-content">
			<!-- 进度条 -->
			<div class="slider" ref="slot">
				<!-- 槽 -->
				<div class="slot">
					<!-- 滑块 -->
					<div class="trigger" :style="{ transform: `translateX(${trigger}px)` }"></div>
					<!-- 已完成的进度 -->
					<div class="complete" :style="{ transform: `scaleX(${nowProgress})` }"></div>
				</div>
			</div>
			<!-- 歌词信息 -->
			<div class="song-info">
				<div class="info">
					<img :src="pirUrl" alt="" />
					<div class="mask" @click="showLyrics">
						<i class="iconfont icon-xiangshangjiantou"></i>
						<i class="iconfont icon-xiangshangjiantou"></i>
					</div>
					<div class="right-info">
						<div class="basic-info overflow">
							<a href="javascript:;" class="" @click="showLyrics">
								<span class="song-name">{{ songName }}</span>
								<span class="singer" v-if="singer">
									- <span v-for="item in singer" :key="item.id">{{ item.name }}</span>
								</span>
							</a>
						</div>
						<div class="operation">
							<a href="javascript:;" v-if="isLike" @click="cancelLike">
								<i class="iconfont icon-xihuan2" title="取消喜欢"></i>
							</a>
							<a href="javascript:;" v-else @click="like">
								<i class="iconfont icon-xihuan21" title="喜欢"></i>
							</a>
							<a href="javascript:;"><i class="iconfont icon-xiazai" title="下载该歌曲"></i></a>
							<a href="javascript:;"><i class="iconfont icon-gengduo" title="更多"></i></a>
							<a href="javascript:;" @click="comment">
								<i class="iconfont icon-pinglun1" title="评论"></i>
							</a>
						</div>
					</div>
				</div>
				<AppControl />
				<div class="more">
					<span class="time">{{ nowTime }}/{{ totalTimeMin || '00:00' }}</span>
					<a href="javascript:;" @click="$store.commit('song/handlerDialog', true)">
						<i class="iconfont icon-list" title="播放队列"></i>
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
import messageBox from '@/utils/message-box';
export default {
	name: 'AppProgress',
	components: { AppControl },
	setup() {
		const router = useRouter();
		const store = useStore();
		const slot = ref(null);
		const isShowLyrics = computed(() => store.state.song.isShowLyrics);
		const totalDuration = computed(() => store.state.song.totalDuration); // 当前音乐总秒数
		const currentMusicID = computed(() => store.state.song.currentMusicID); // 当前音乐ID
		const nowProgress = computed(() => store.state.song.nowProgress); // 当前进度
		const status = computed(() => store.state.user.status);
		// 滑块位置
		const trigger = computed(() => {
			if (slot.value) return nowProgress.value * slot.value.offsetWidth;
		});
		// 当前歌曲是否为我喜欢的歌曲
		const isLike = computed(() => {
			const playlist = computed(() => store.state.song.playlist);
			let flag = false;
			playlist.value.forEach(e => {
				if (e.id === currentMusicID.value) if (e.isLike) flag = true;
			});
			return flag;
		});
		// 点击显示或隐藏歌曲详情页
		const showLyrics = () => store.commit('song/SHOWLYRICS', true);
		// 绑定点击事件 返回点击位置的音乐秒数
		const { x } = useClick(slot, totalDuration);
		// 监视用户点击进度条 根据点击位置修改音乐进度
		watch(x, newVal => store.commit('song/DURATION', newVal), { immediate: true });
		// 查看评论
		const comment = () => {
			if (currentMusicID.value) router.push(`/comment`);
		};
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
						router.push('/login');
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
		return {
			isShowLyrics,
			showLyrics,
			slot,
			comment,
			isLike,
			like,
			cancelLike,
			nowProgress,
			trigger,
			totalTimeMin: computed(() => store.state.song.url.time),
			songName: computed(() => store.getters['song/songName']),
			singer: computed(() => store.getters['song/singer']),
			pirUrl: computed(() => store.state.song.picUrl),
			nowTime: computed(() => store.state.song.nowTime),
			playlistNumber: computed(() => store.state.song.playlist.length),
		};
	},
};
</script>

<style lang="less" scoped>
.app-progress {
	width: 100%;
	.progress-content {
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
				background-color: rgba(0, 0, 0, 0.2);
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
					background-image: linear-gradient(45deg, #1fd4ae, #1ecc95);
					transition: all 0.2s;
					transform-origin: left;
				}
			}
		}
		// 歌曲信息
		.song-info {
			display: flex;
			height: 5rem;
			padding: 0 1.78rem;
			> div {
				flex: 1;
				display: flex;
				align-items: center;
			}
			.info {
				position: relative;
				height: 100%;
				img {
					width: 3.1rem;
					height: 3.1rem;
					border-radius: 0.35rem;
					cursor: pointer;
				}
				.mask {
					position: absolute;
					left: 0;
					width: 3.1rem;
					height: 3.1rem;
					border-radius: 0.35rem;
					cursor: pointer;
					background-color: rgba(0, 0, 0, 0.5);
					transition: opacity 0.2s;
					opacity: 0;
					i {
						color: #fff;
						position: absolute;
						font-size: 1rem;
						&:first-child {
							top: 10px;
							left: 50%;
							transform: translateX(-50%);
						}
						&:last-child {
							top: 18px;
							left: 50%;
							transform: translateX(-50%);
						}
					}
					&:hover {
						opacity: 1;
					}
				}
				.right-info {
					padding: 0 0.7rem;
					width: 10rem;
					height: 3.1rem;
					.basic-info {
						&:hover > a {
							animation-play-state: paused;
						}
						a {
							display: inline-block;
							white-space: nowrap;
							font-size: 0.9rem;
							animation: roll 5s linear infinite;
							.singer {
								color: #7b7b7b;
								span {
									&::after {
										content: ' / ';
									}
									&:last-child {
										&::after {
											display: none;
										}
									}
								}
							}
						}
					}
					.operation {
						i {
							font-size: 1rem;
							margin: 0 0.35rem;
							&:hover {
								color: #1ecc94;
							}
						}
						.icon-xihuan2 {
							color: #ff6664 !important;
						}
					}
				}
			}
			.more {
				height: 100%;
				font-size: 1rem;
				justify-content: right;
				> span {
					margin: 0 0.35rem;
					color: #7b7b7b;
				}
				a {
					i {
						font-size: 1.3rem;
					}
					&:hover {
						color: #1ecc94;
					}
				}
			}
		}
	}
}
@keyframes roll {
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(-100%);
	}
}
</style>
