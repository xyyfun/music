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
					v-for="(item, index) in songLists"
					:key="item.id"
					@dblclick="play(item.id)"
					:class="{
						active: item.id === currentMusicID || item.id === currentShowPanel,
						noCopyright: item.st === -200 || item.st === -1,
					}">
					<ul>
						<li class="songs">
							<span class="number">{{ index + 1 <= 9 ? '0' + (index + 1) : index + 1 }}</span>
							<i class="iconfont icon-xihuan2" @click="cancelLike(item.id)" v-if="item.isLike"></i>
							<i class="iconfont icon-xihuan21" @click="like(item.id)" v-else></i>
							<span class="singer ellipsis">{{ item.name }}</span>
							<AppIcon :fee="item.fee" :originCoverType="item.originCoverType" :mv="item.mv" />
						</li>
						<li
							class="ico"
							:style="
								item.id === currentMusicID || item.id === currentShowPanel ? 'display:block' : ''
							">
							<a
								href="javascript:;"
								v-if="!isPlay || item.id !== currentMusicID"
								@click="play(item.id)"
								title="播放">
								<i class="iconfont icon-bofang"></i>
							</a>
							<a
								href="javascript:;"
								v-else
								@click="$store.commit('song/ISPLAY', false)"
								title="暂停">
								<i class="iconfont icon-pause"></i>
							</a>
							<a href="javascript:;" title="添加到"><i class="iconfont icon-tianjia"></i></a>
							<a href="javascript:;" title="下载"><i class="iconfont icon-xiazai"></i></a>
							<a
								href="javascript:;"
								ref="morePanel"
								class="more"
								title="更多"
								@click="currentShowPanel = item.id">
								<i class="iconfont icon-gengduo"></i>
								<transition name="more-actions">
									<AppMoreActions
										v-show="currentShowPanel === item.id"
										@closePanel="currentShowPanel = 0"
										:song="item" />
								</transition>
							</a>
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
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import AppIcon from '@/components/app-icon';
import AppMoreActions from '@/components/app-more-actions';
import message from '@/utils/message';
import messageBox from '@/utils/message-box';
import { onClickOutside } from '@vueuse/core';
export default {
	name: 'MusicPlaylistList',
	components: { AppIcon, AppMoreActions },
	props: {
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
		const store = useStore();
		const router = useRouter();
		const currentShowPanel = ref(0);
		const morePanel = ref(null);
		const songLists = computed(() => store.state.playlist.songLists); // 数据源
		const status = computed(() => store.state.user.status);
		// 播放
		const play = id => {
			store.commit('song/ISPLAY', false); // 播放前将播放器暂停
			store.dispatch('song/getMusic', id);
		};
		// 喜欢音乐
		const like = async id => {
			if (status.value === 2) {
				try {
					await store.dispatch('playlist/changUserLike', { id, boolean: true });
					store.commit('song/changPlaylistLike', { id, boolean: true });
					message({ type: 'success', message: '已添加到我喜欢的音乐！' });
				} catch (error) {
					message({ type: 'error', message: error.data.message });
				}
			} else {
				messageBox({
					title: '提示',
					message: '喜欢音乐需要先登录，是否现在登录？',
					isShowCancel: true,
				}).then(
					() => {
						store.commit('user/changPanelStatus', true);
					},
					() => {}
				);
			}
		};
		// 取消喜欢
		const cancelLike = async id => {
			try {
				await store.dispatch('playlist/changUserLike', { id, boolean: false });
				store.commit('song/changPlaylistLike', { id, boolean: false });
				message({ type: 'success', message: '已取消喜欢！' });
			} catch (error) {
				message({ type: 'error', message: error.data.message });
			}
		};
		onClickOutside(morePanel, () => (currentShowPanel.value = 0));
		return {
			songLists,
			currentShowPanel,
			morePanel,
			play,
			like,
			cancelLike,
			currentMusicID: computed(() => store.state.song.currentMusicID),
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
				border-left: 2px solid transparent;
				&:hover {
					background-color: var(--global-hover2-bg);
				}
				&:hover .ico {
					display: block;
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
							color: var(--theme-color-like);
						}
						> i {
							padding-right: 0.5rem;
							&:hover {
								color: var(--theme-color-like);
								cursor: pointer;
							}
						}
					}
					.ico {
						width: 7rem;
						display: none;
						.more {
							position: relative;
						}
						i {
							margin: 0 0.3rem;
							&:hover {
								color: var(--theme-color);
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
			.noCopyright {
				a {
					color: #7b7b7b;
				}
				color: #7b7b7b;
			}
			.active {
				background-color: var(--global-hover2-bg);
				border-left: 2px solid var(--theme-color);
			}
		}
	}
}
</style>
