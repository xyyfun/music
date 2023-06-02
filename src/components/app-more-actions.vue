<template>
	<div class="app-more-actions">
		<div class="more-actions">
			<ul>
				<li v-if="!isPlay || currentMusicID !== song.id">
					<a href="javascript:;" @click.stop="play(song.id)">
						<i class="iconfont icon-bofang"></i>
						<span>播放</span>
					</a>
				</li>
				<li>
					<a href="javascript:;" @click.stop="last(song)">
						<i class="iconfont icon-xinjian"></i>
						<span>添加到播放列表</span>
					</a>
				</li>
				<li v-if="song.mv">
					<router-link :to="`/player?vid=${song.mv}&type=mv`">
						<i class="iconfont icon-MV"></i>
						<span>播放MV</span>
					</router-link>
				</li>
				<li>
					<a href="javascript:;" v-if="song.isLike" @click="cancelLike(song.id)">
						<i class="iconfont icon-xihuan2"></i>
						<span>取消喜欢</span>
					</a>
					<a href="javascript:;" v-else @click="likeSong(song.id)">
						<i class="iconfont icon-xihuan21"></i>
						<span>我喜欢</span>
					</a>
				</li>
				<li>
					<a href="javascript:;" @click="isShowList = true" ref="addPlaylist">
						<i class="iconfont icon-tianjia"></i>
						<span>添加到歌单</span>
						<i class="iconfont icon-xiangyoujiantou"></i>
						<transition name="more-actions">
							<AppAddPlaylist
								v-if="isShowList"
								@closeList="$emit('closePanel')"
								:songId="song.id" />
						</transition>
					</a>
				</li>
				<li>
					<a href="javascript:;" title="下载" @click="download(song.id, song.name)">
						<i class="iconfont icon-xiazai"></i>
						<span>下载</span>
					</a>
				</li>
				<li>
					<router-link :to="`/comment/${song.id}`">
						<i class="iconfont icon-pinglun1"></i>
						<span>查看评论</span>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import AppAddPlaylist from '@/components/app-add-playlist';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import message from '@/utils/message';
import { onClickOutside } from '@vueuse/core';
export default {
	name: 'AppMoreActions',
	emits: ['closePanel'],
	components: { AppAddPlaylist },
	props: {
		song: {
			type: Object,
			default: {},
		},
	},
	setup(props, { emit }) {
		const store = useStore();
		const addPlaylist = ref(null);
		const isShowList = ref(false);
		const status = computed(() => store.state.user.status); // 登录状态
		// 播放音乐
		const play = id => {
			store.commit('song/ISPLAY', false); // 播放前将播放器暂停
			store.dispatch('song/getMusic', id);
			emit('closePanel');
		};
		// 添加至播放列表
		const last = value => {
			store.commit('song/addList', value);
			emit('closePanel');
		};
		// 喜欢音乐
		const likeSong = async id => {
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
						router.push('/login');
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
		// 下载音乐
		const download = id => message({ type: 'warn', message: '跨域受限暂不提供下载功能' });
		onClickOutside(addPlaylist, () => (isShowList.value = false));
		return {
			addPlaylist,
			isShowList,
			play,
			last,
			likeSong,
			cancelLike,
			download,
			currentMusicID: computed(() => store.state.song.currentMusicID),
			isPlay: computed(() => store.state.song.isPlay),
		};
	},
};
</script>

<style lang="less" scoped>
.app-more-actions {
	position: absolute;
	left: 100%;
	z-index: 20;
	.more-actions {
		width: 10rem;
		background-color: var(--global-bg2);
		border-radius: 0.5rem;
		box-shadow: 0 0 10px var(--shadow-black);
		padding: 0.5rem 0;
		> ul {
			> li {
				height: 2rem;
				line-height: 2rem;
				&:hover {
					background-color: var(--global-bg7);
				}
				a {
					position: relative;
					display: flex;
					justify-content: space-between;
					font-size: 0.85rem;
					padding: 0 0.8rem;
					i {
						&:first-child {
							display: block;
							width: 1.5rem;
							text-align: center;
							margin-right: 0.5rem;
						}
					}
					.icon-xiayishou,
					.icon-MV {
						font-size: 1.3rem;
					}
					.icon-xihuan2 {
						color: var(--theme-color-like);
					}
					.icon-xiangyoujiantou {
						font-size: 0.5rem;
					}
					span {
						flex: 1;
					}
				}
			}
		}
	}
}
</style>
