<template>
	<div class="app-progress">
		<div class="progress-content">
			<!-- 进度条 -->
			<div class="slider">
				<!-- 槽 -->
				<div class="slot" ref="slot" @click.self="handlerProgress($event)">
					<!-- 滑块 -->
					<div class="trigger" :style="{ left: nowProgress + '%' }"></div>
					<!-- 已完成的进度 -->
					<div
						@click="handlerProgress($event)"
						class="complete"
						:style="{ width: nowProgress + '%' }"></div>
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
							<a href="javascript:;" class="ellipsis" @click="showLyrics">
								<span class="song-name">{{ songName }}</span>
								<span class="singer">
									- <span v-for="item in singer" :key="item.id">{{ item.name }}</span>
								</span>
							</a>
						</div>
						<div class="operation">
							<a href="javascript:;" v-if="isLike" @click="cancelLike">
								<i class="iconfont icon-xihuan2" title="取消喜欢"></i>
							</a>
							<a href="javascript:;" v-else @click="like"
								><i class="iconfont icon-xihuan21" title="喜欢"></i
							></a>
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
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { handlerDuration } from '@/hooks/useProgress';
import AppControl from '@/components/app-control';
import message from '@/utils/message';
export default {
	name: 'AppProgress',
	components: { AppControl },
	setup() {
		const router = useRouter();
		const store = useStore();
		const slot = ref(null);
		const isShowLyrics = computed(() => store.state.song.isShowLyrics);
		const totalTimeS = computed(() => store.state.song.totalDuration);
		const currentMusicID = computed(() => store.state.song.currentMusicID);
		const userLikeList = computed(() => store.state.user.userLikeList);
		const isLike = computed(() => {
			return userLikeList.value.some(item => item === currentMusicID.value);
		});
		// 点击显示或隐藏歌曲详情页
		const showLyrics = () => {
			store.commit('song/SHOWLYRICS', true);
		};
		// 用户修改进度
		const handlerProgress = e => {
			store.commit('song/DURATION', handlerDuration(e, slot, totalTimeS));
		};
		// 查看评论
		const comment = () => {
			if (currentMusicID.value) router.push(`/comment`);
		};
		// 喜欢该歌曲
		const like = () => {
			const result = store.dispatch('user/userLike', { id: currentMusicID.value, bol: true });
			if (result) message({ type: 'success', message: '已添加到我喜欢的音乐！' });
		};
		// 取消喜欢歌曲
		const cancelLike = () => {
			const result = store.dispatch('user/userLike', { id: currentMusicID.value, bol: false });
			if (result) message({ type: 'success', message: '已取消喜欢！' });
		};
		return {
			isShowLyrics,
			showLyrics,
			slot,
			comment,
			handlerProgress,
			isLike,
			like,
			cancelLike,
			totalTimeMin: computed(() => store.state.song.url.time),
			songName: computed(() => store.getters['song/songName']),
			singer: computed(() => store.getters['song/singer']),
			pirUrl: computed(() => store.state.song.picUrl),
			nowTime: computed(() => store.state.song.nowTime),
			nowProgress: computed(() => store.state.song.nowProgress),
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
			&:hover .slot .trigger {
				opacity: 1;
			}
			.slot {
				position: relative;
				width: 100%;
				height: 2px;
				background-color: rgba(0, 0, 0, 0.2);
				cursor: pointer;
				.trigger {
					opacity: 0;
					position: absolute;
					top: -3px;
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
					width: 14rem;
					height: 3.1rem;
					.basic-info {
						a {
							display: block;
							font-size: 0.9rem;
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
							&:hover {
								text-overflow: unset;
								overflow: visible;
								transform: translateX(-100%);
								transition: all 3s linear;
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
</style>
