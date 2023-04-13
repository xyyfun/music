<template>
	<div class="lyrics-progress">
		<div class="progress">
			<!-- 滑动 -->
			<div class="slider">
				<!-- 槽 -->
				<div class="slot" ref="slot" @click.self="handlerProgress($event)">
					<!-- 滑块 -->
					<div class="trigger" :style="{ left: nowProgress + '%' }"></div>
					<!-- 播放进度 -->
					<div
						class="complete"
						@click.self="handlerProgress($event)"
						:style="{ width: nowProgress + '%' }"></div>
				</div>
			</div>
			<div class="info">
				<div class="operation">
					<a href="javascript:;" title="喜欢"><i class="iconfont icon-xihuan21"></i></a>
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
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { handlerDuration } from '@/hooks/useProgress';
import AppControl from '@/components/app-control';
export default {
	name: 'LyricsProgress',
	components: { AppControl },
	setup() {
		const store = useStore();
		const router = useRouter();
		const slot = ref(null);
		const totalTimeS = computed(() => store.state.song.totalDuration);
		const currentMusicID = computed(() => store.state.song.currentMusicID);
		const handlerProgress = e => {
			store.commit('song/DURATION', handlerDuration(e, slot, totalTimeS));
		};
		// 查看评论
		const comment = () => {
			if (currentMusicID.value) {
				router.push(`/comment`);
				store.commit('song/SHOWLYRICS', false);
			}
		};
		return {
			slot,
			handlerProgress,
			comment,
			totalTimeMin: computed(() => store.state.song.url.time),
			nowTime: computed(() => store.state.song.nowTime),
			nowProgress: computed(() => store.state.song.nowProgress),
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
			.slot {
				position: relative;
				width: 100%;
				height: 2px;
				background-color: rgba(0, 0, 0, 0.2);
				cursor: pointer;
				.trigger {
					position: absolute;
					top: -3px;
					left: 30%;
					width: 8px;
					height: 8px;
					background-color: #1ece9b;
					border-radius: 50%;
					transition: all 0.2s;
				}
				.complete {
					width: 20%;
					height: 2px;
					background-color: #1ece9b;
					transition: all 0.2s;
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
