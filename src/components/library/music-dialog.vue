<template>
	<Transition name="dialog">
		<div class="app-dialog" v-if="isShowDialog" ref="dialog">
			<div class="dialog-content">
				<div class="dialog-head">
					<p>播放队列</p>
					<div class="remove">
						<span>{{ playlist.length }}首歌曲</span>
						<i
							v-if="playlist.length"
							class="iconfont icon-remove"
							title="删除"
							@click="$store.commit('song/removeList')"></i>
					</div>
				</div>
				<div class="dialog-body scroll">
					<ul>
						<li
							v-for="item in playlist"
							:key="item.id"
							:class="{ active: currentMusicID === item.id }">
							<div class="info">
								<div class="songName ellipsis" @click="showlyrics(item.id)">{{ item.name }}</div>
								<div class="msg">
									<div class="singer ellipsis">
										<span v-for="(val, index) in item.ar" :key="index">{{ val.name }}</span>
									</div>
									<span class="time">{{ item.dt }}</span>
									<div class="ico">
										<a href="javascript:;" @click="play(item.id)">
											<i class="iconfont icon-bofang"></i>
										</a>
										<a href="javascript:;"><i class="iconfont icon-xihuan21"></i></a>
										<a href="javascript:;"><i class="iconfont icon-gengduo"></i></a>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="dialog-footer">
					<a href="javascript:;" @click="$store.commit('song/handlerDialog', false)">
						<i class="iconfont icon-list"></i><span>收起</span>
					</a>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { onClickOutside } from '@vueuse/core';
export default {
	name: 'MusicDialog',
	setup() {
		const dialog = ref(null);
		const store = useStore();
		const play = id => {
			store.commit('song/ISPLAY', false);
			store.dispatch('song/getMusic', id);
		};
		const showlyrics = id => {
			store.commit('song/ISPLAY', false);
			store.dispatch('song/getMusic', id);
			store.commit('song/SHOWLYRICS', true);
			store.commit('song/handlerDialog', false);
		};
		onClickOutside(dialog, () => {
			store.commit('song/handlerDialog', false);
		});
		return {
			dialog,
			play,
			showlyrics,
			isShowDialog: computed(() => store.state.song.isShowDialog),
			playlist: computed(() => store.state.song.playlist),
			currentMusicID: computed(() => store.state.song.currentMusicID),
		};
	},
};
</script>

<style lang="less" scoped>
.app-dialog {
	position: absolute;
	top: 0;
	right: 0;
	width: 20rem;
	height: 100vh;
	background-color: rgba(255, 255, 255, 0.5);
	z-index: 9999;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	.dialog-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;
		backdrop-filter: blur(10px);
		> div {
			width: 100%;
		}
		.dialog-head {
			display: flex;
			align-content: center;
			flex-wrap: wrap;
			height: 6rem;
			padding: 0 1.5rem;
			p {
				font-size: 1.5rem;
			}
			.remove {
				display: flex;
				justify-content: space-between;
				width: 100%;
				span {
					font-size: 0.9rem;
				}
				i {
					font-size: 1rem;
					cursor: pointer;
				}
			}
		}
		.dialog-body {
			flex: 1;
			overflow: auto;
			ul {
				li {
					height: 4rem;
					padding: 0 1.5rem;
					cursor: pointer;
					.info {
						display: flex;
						flex-direction: column;
						justify-content: center;
						height: 100%;
						.songName {
							font-size: 1rem;
						}
						.msg {
							display: flex;
							justify-content: space-between;
							color: #808080;
							.singer {
								span {
									font-size: 0.9rem;
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
							.time {
								font-size: 1rem;
							}
						}
					}
					.ico {
						display: none;
						font-size: 1rem;
						a {
							padding: 0 0.5rem;
							&:hover {
								color: #1ece9c;
							}
						}
					}
					&:hover {
						background-color: #f8f8f8;
						.time {
							display: none;
						}
						.ico {
							display: block;
						}
					}
				}
				.active {
					background-color: #f8f8f8;
					color: #1ece9c;
					border-left: 2px solid #1ece9c;
				}
			}
		}
		.dialog-footer {
			display: flex;
			align-items: center;
			justify-content: right;
			height: 5.4rem;
			border-top: 2px solid #f3f3f3;
			padding: 0 1.5rem;
			cursor: pointer;
		}
	}
} /* 进入的起点,离开的终点 */
.dialog-enter-from,
.dialog-leave-to {
	transform: translateX(100%);
}
/* 进入进行时,离开进行时 */
.dialog-enter-active,
.dialog-leave-active {
	transition: all 0.5s;
}

/* 进入的终点,离开的起点 */
.dialog-enter-to,
.dialog-leave {
	transform: translateX(none);
}
</style>
