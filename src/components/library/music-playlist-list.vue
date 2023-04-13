<template>
	<div class="music-playlist-list">
		<div class="lists">
			<div class="head">
				<ul>
					<li>歌曲</li>
					<li v-if="isShowSinger">歌手</li>
					<li v-if="isShowAlbum">专辑</li>
					<li>时长</li>
				</ul>
			</div>
			<div class="list">
				<div
					class="item"
					v-for="(item, index) in lists"
					:key="item.id"
					:class="{ active: item.id === currentMusicID }">
					<ul>
						<li class="songs">
							<span class="number">{{ index + 1 <= 9 ? '0' + (index + 1) : index + 1 }}</span>
							<i class="iconfont icon-xihuan2" v-if="item.isLike"></i>
							<i class="iconfont icon-xihuan21" @click="like(item.id)" v-else></i>
							<span class="singer ellipsis">{{ item.name }}</span>
							<AppIcon :fee="item.fee" :originCoverType="item.originCoverType" :mv="item.mv" />
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
								title="暂停"
								@click="$store.commit('song/ISPLAY', false)"></i>
							<i class="iconfont icon-tianjia" title="添加到"></i>
							<i class="iconfont icon-xiazai" title="下载"></i>
							<i class="iconfont icon-gengduo" title="更多"></i>
						</li>
						<li v-if="isShowSinger" class="name ellipsis">
							<router-link :to="`/singer/${val.id}`" v-for="val in item.ar" :key="val.id">
								{{ val.name }}
							</router-link>
						</li>
						<li v-if="isShowAlbum" class="album ellipsis">
							<router-link :to="`/album/${item.al.id}`">{{ item.al.name }}</router-link>
						</li>
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
import AppIcon from '@/components/app-icon';
import message from '@/utils/message';
export default {
	name: 'MusicPlaylistList',
	components: { AppIcon },
	props: {
		lists: {
			type: Array,
			default: () => [],
		},
		// 是否显示歌手
		isShowSinger: {
			type: Boolean,
			default: true,
		},
		// 是否显示专辑
		isShowAlbum: {
			type: Boolean,
			default: true,
		},
		// 是否显示特权
		isShowPrivilege: {
			type: Boolean,
			default: true,
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
		// 喜欢音乐
		const like = async id => {
			const result = await store.dispatch('user/userLike', { id, bol: true });
			if (result) message({ type: 'success', message: '已添加到我喜欢的音乐！' });
		};
		return {
			play,
			like,
			currentMusicID,
			isPlay: computed(() => store.state.song.isPlay),
		};
	},
};
</script>

<style lang="less" scoped>
.music-playlist-list {
	.lists {
		.head {
			ul {
				display: flex;
				li {
					width: 25%;
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
						width: 25%;
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
						.number {
							margin-right: 5rem;
							margin-left: 1rem;
						}
						.icon-xihuan2 {
							color: #ff6664;
						}
						> i {
							padding-right: 0.5rem;
							&:hover {
								color: #ff6664;
								cursor: pointer;
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
					.name {
						a {
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
			.active {
				background-color: #efefef;
				border-left: 2px solid #1fd3ac;
			}
		}
	}
}
</style>
