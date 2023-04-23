<template>
	<div class="app-album scroll">
		<div class="album-content">
			<MusicPlaylistDescription />
			<MusicTabs :tabs="tabs" :isRouter="false" @handlerBac="handlerBac" />
			<AlbumList v-if="now === 1" />
			<AlbumComment v-if="now === 2" />
		</div>
	</div>
</template>

<script>
import MusicPlaylistDescription from '@/components/library/music-playlist-description';
import MusicTabs from '@/components/library/music-tabs';
import AlbumList from './components/album-list';
import AlbumComment from './components/album-comment';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
export default {
	name: 'AppAlbum',
	components: { MusicPlaylistDescription, MusicTabs, AlbumList, AlbumComment },
	setup() {
		const route = useRoute();
		const store = useStore();
		const now = ref(1);
		const tabs = [
			{ title: '歌曲', id: 1 },
			{ title: '评论', id: 2 },
		];
		const handlerBac = id => (now.value = id);
		// 监视路由变化
		watch(
			() => route.params.id,
			() => store.commit('playlist/clearData'),
			{ immediate: true }
		);
		return {
			tabs,
			now,
			handlerBac,
		};
	},
};
</script>

<style lang="less" scoped>
.app-album {
	flex: 1;
	overflow-y: auto;
	.album-content {
		padding: 0 1.78rem;
	}
}
</style>
