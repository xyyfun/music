<template>
	<div class="singer-list">
		<div class="lists">
			<div class="head">
				<ul>
					<li>歌曲</li>
					<li>专辑</li>
					<li>时长</li>
				</ul>
			</div>
			<div class="list">
				<div class="item" v-for="item in hotSongs" :key="item.id">
					<ul>
						<li class="songs">
							<i class="iconfont icon-xihuan21"></i>
							<span class="singer ellipsis">{{ item.name }}</span>
							<a href="" v-if="!item.privilege.cp"><i class="iconfont icon-shiting"></i></a>
							<a href="" v-if="item.privilege.cp"><i class="iconfont icon-VIP"></i></a>
							<a href="" v-if="item.mv"><i class="iconfont icon-MV"></i></a>
						</li>
						<li class="ico">
							<i
								class="iconfont icon-bofang"
								v-if="!isPlay || item.id !== currentMusicID"
								@click="play(item.id, item)"
								title="播放">
							</i>
							<i
								class="iconfont icon-pause"
								v-else
								@click="$store.commit('song/ISPLAY', false)"
								title="暂停"></i>
							<i class="iconfont icon-tianjia" title="添加到"></i>
							<i class="iconfont icon-xiazai" title="下载"></i>
							<i class="iconfont icon-gengduo" title="更多"></i>
						</li>
						<li class="album ellipsis">{{ item.al.name }}</li>
						<li class="time">{{ item.dt }}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
	name: 'SingerList',
	props: {
		hotSongs: {
			type: Array,
			default: () => [],
		},
	},
	setup() {
		const currentMusicID = computed(() => store.state.song.currentMusicID);
		const store = useStore();
		// 播放
		const play = id => {
			// 播放前判断当前是否有音乐暂停且暂停音乐是播放的音乐
			if (currentMusicID.value === id) return store.commit('song/ISPLAY', true);
			store.commit('song/ISPLAY', false); // 播放前将播放器暂停
			store.dispatch('song/getMusic', id);
		};
		return {
			play,
			currentMusicID,
			isPlay: computed(() => store.state.song.isPlay),
		};
	},
};
</script>

<style lang="less" scoped>
.singer-list {
	padding: 0 1.78rem;
	.lists {
		.head {
			ul {
				display: flex;
				li {
					width: 35%;
					font-size: 0.9rem;
					color: #7b7b7b;
					&:first-child {
						flex: 1;
					}
					&:last-child {
						width: 5rem;
					}
				}
			}
		}
		.list {
			.item {
				padding: 0.5rem 0;
				&:hover {
					background-color: #efefef;
				}
				&:hover .ico {
					opacity: 1;
				}
				ul {
					display: flex;
					align-items: center;
					li {
						width: 35%;
						font-size: 0.9rem;
						i {
							font-size: 1rem;
						}
						&:first-child {
							flex: 1;
						}
						&:last-child {
							width: 5rem;
						}
					}
					.songs {
						display: flex;
						align-items: center;
						> i {
							padding-right: 0.5rem;
							&:hover {
								color: #ff6664;
								cursor: pointer;
							}
						}
						a {
							margin: 0 0.2rem;
							i {
								font-size: 1.3rem;
							}
							.icon-shiting {
								color: #ff6664;
							}
							.icon-VIP {
								color: #1fd3ac;
							}
							.icon-MV {
								color: #e5b046;
							}
						}
					}
					.ico {
						width: 7rem;
						opacity: 0;
						i {
							margin: 0 0.3rem;
							&:hover {
								color: #1fd3ac;
								cursor: pointer;
							}
						}
					}
				}
			}
			.active {
				background-color: #efefef;
			}
		}
	}
}
</style>
