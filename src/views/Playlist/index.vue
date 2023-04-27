<template>
	<div class="app-playlist scroll">
		<div class="playlist-content">
			<MusicPlaylistDescription />
			<MusicTabs :tabs="tabs" :isRouter="false" @handlerBac="handlerBac" />
			<PlaylistList v-if="now === 1" />
			<PlaylistComment v-if="now === 2" />
		</div>
	</div>
</template>

<script>
import MusicPlaylistDescription from '@/components/library/music-playlist-description';
import MusicTabs from '@/components/library/music-tabs';
import PlaylistList from './components/playlist-list';
import PlaylistComment from './components/playlist-comment';
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
	name: 'AppPlaylist',
	components: { MusicPlaylistDescription, MusicTabs, PlaylistList, PlaylistComment },
	setup() {
		const store = useStore();
		const route = useRoute();
		const now = ref(1);
		const tabs = [
			{ title: '歌曲', id: 1 },
			{ title: '评论', id: 2 },
		];
		console.log(now.value);
		onMounted(() => console.log(now.value));
		const handlerBac = id => (now.value = id);
		// 监视路由变化
		watch(
			() => route.params.id,
			() => store.commit('playlist/clearData'),
			{ immediate: true }
		);
		return {
			now,
			tabs,
			handlerBac,
		};
	},
};
</script>

<style lang="less" scoped>
.app-playlist {
	flex: 1;
	overflow-y: auto;
	.playlist-content {
		padding: 0 1.78rem;
	}
}
</style>
