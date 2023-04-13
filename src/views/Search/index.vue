<template>
	<div class="app-search scroll" ref="el">
		<div class="search-content">
			<MusicTabs :tabs="tabs" :isRouter="false" @handlerBac="handlerBac" />
			<SearchSongs v-if="now === 1" @viewsTop="viewsTop" />
			<SearchAlbum v-if="now === 10" @viewsTop="viewsTop" />
			<SearchSinger v-if="now === 100" />
			<SearchPlaylist v-if="now === 1000" @viewsTop="viewsTop" />
			<SearchVideo v-if="now === 1014" @viewsTop="viewsTop" />
		</div>
	</div>
</template>

<script>
import MusicTabs from '@/components/library/music-tabs';
import SearchSongs from './components/search-songs';
import SearchAlbum from './components/search-album';
import SearchSinger from './components/search-singer';
import SearchPlaylist from './components/search-playlist';
import SearchVideo from './components/search-video';
import { useScroll } from '@vueuse/core';
import { ref } from 'vue';
export default {
	name: 'AppSearch',
	components: { MusicTabs, SearchSongs, SearchAlbum, SearchSinger, SearchPlaylist, SearchVideo },
	setup() {
		const el = ref(null);
		const { y } = useScroll(el);
		const now = ref(1); // 当前栏
		const tabs = ref([
			{ title: '歌曲', id: 1 },
			{ title: '专辑', id: 10 },
			{ title: '歌手', id: 100 },
			{ title: '歌单', id: 1000 },
			{ title: '视频', id: 1014 },
		]);
		const handlerBac = id => (now.value = id);
		const viewsTop = () => (y.value = 0);
		return {
			now,
			el,
			tabs,
			handlerBac,
			viewsTop,
		};
	},
};
</script>

<style lang="less" scoped>
.app-search {
	flex: 1;
	overflow-y: auto;
	.search-content {
		padding: 0 1.78rem;
	}
}
</style>
