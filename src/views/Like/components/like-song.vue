<template>
	<div class="play-all">
		<a href="javascript:;" @click="playAll"><i class="iconfont icon-bofang"></i>全部播放 </a>
	</div>
	<MusicPlaylistList />
</template>

<script>
import MusicPlaylistList from '@//components/library/music-playlist-list';
import { useStore } from 'vuex';
import { computed, onMounted, onUnmounted, watch } from 'vue';
export default {
	name: 'LikeSong',
	components: { MusicPlaylistList },
	setup() {
		const store = useStore();
		//全部播放
		const playAll = () => {
			store.commit('song/ISPLAY', false);
			const lists = computed(() => store.state.playlist.songLists);
			store.commit('song/addList', lists.value);
			store.dispatch('song/getMusic', lists.value[0].id);
		};
		onMounted(() => {
			watch(
				() => store.state.user.usersongLike,
				newVal => {
					if (newVal) store.dispatch('playlist/getPlaylistDetail', newVal);
				},
				{ immediate: true }
			);
		});
		onUnmounted(() => store.commit('playlist/clearData'));
		return {
			playAll,
		};
	},
};
</script>

<style lang="less" scoped>
.play-all {
	display: flex;
	margin: 1rem 0;
	a {
		display: block;
		padding: 0.5rem 2rem;
		border-radius: 5rem;
		font-size: 0.9rem;
		background-color: var(--theme-color);
		color: var(--text-default4-color);
	}
	i {
		padding: 0 5px;
	}
}
</style>
