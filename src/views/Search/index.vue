<template>
	<div class="app-search scroll">
		<div class="search-content">
			<div class="title">
				<p>搜索 {{ keyword }}</p>
			</div>
			<SearchMultiMatch />
			<MusicTabs :tabs="tabs" :isRouter="false" @handlerBac="handlerBac" />
			<SearchSongs v-if="now === 1" />
			<SearchAlbum v-if="now === 10" />
			<SearchSinger v-if="now === 100" />
			<SearchPlaylist v-if="now === 1000" />
			<SearchVideo v-if="now === 1014" />
		</div>
	</div>
</template>

<script>
import SearchMultiMatch from './components/search-multi-match';
import MusicTabs from '@/components/library/music-tabs';
import SearchSongs from './components/search-songs';
import SearchAlbum from './components/search-album';
import SearchSinger from './components/search-singer';
import SearchPlaylist from './components/search-playlist';
import SearchVideo from './components/search-video';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
export default {
	name: 'AppSearch',
	components: {
		SearchMultiMatch,
		MusicTabs,
		SearchSongs,
		SearchAlbum,
		SearchSinger,
		SearchPlaylist,
		SearchVideo,
	},
	setup() {
		const route = useRoute();
		const now = ref(1); // 当前栏
		const keyword = ref('');
		const tabs = [
			{ title: '歌曲', id: 1 },
			{ title: '专辑', id: 10 },
			{ title: '歌手', id: 100 },
			{ title: '歌单', id: 1000 },
			{ title: '视频', id: 1014 },
		];
		const handlerBac = id => (now.value = id);
		onMounted(() => {
			watch(
				() => route.params.keyword,
				newVal => {
					keyword.value = newVal;
				},
				{ immediate: true }
			);
		});
		return {
			now,
			keyword,
			tabs,
			handlerBac,
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
		.title {
			display: flex;
			align-items: center;
			height: 4rem;
			p {
				font-size: 1.5rem;
				font-weight: bold;
			}
		}
	}
}
</style>
