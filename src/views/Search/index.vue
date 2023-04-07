<template>
	<div class="app-search scroll">
		<div class="search-content">
			<MusicTabs :tabs="tabs" :isRouter="false" @handlerBac="handlerBac" />
			<MusicPlaylistList :lists="lists" :isShowSinger="true" :isShowAlbum="true" />
		</div>
	</div>
</template>

<script>
import MusicTabs from '@/components/library/music-tabs';
import MusicPlaylistList from '@/components/library/music-playlist-list';
import { search } from '@/api/search';
import { useRoute } from 'vue-router';
import { useDateFormat } from '@vueuse/core';
import { ref, watch } from 'vue';
export default {
	name: 'AppSearch',
	components: { MusicTabs, MusicPlaylistList },
	setup() {
		const route = useRoute();
		const limit = ref(30);
		const type = ref(1);
		const lists = ref([]);
		const tabs = ref([
			{ title: '歌曲', id: 1 },
			{ title: '专辑', id: 10 },
			{ title: '歌手', id: 100 },
			{ title: '歌单', id: 1000 },
			{ title: '用户', id: 1002 },
			{ title: 'MV', id: 1004 },
			{ title: '电台', id: 1009 },
			{ title: '视频', id: 1014 },
		]);
		const handlerBac = () => {};

		watch(
			() => route.params.keyword,
			newVal => {
				search(newVal, limit.value, type.value).then(data => {
					console.log(data);
					data.data.result.songs.forEach(e => {
						e.privilege = { cp: 1 };
						e.al = e.album;
						e.ar = e.artists;
						e.dt = useDateFormat(e.duration, 'mm:ss');
						delete e.album;
						delete e.artists;
						delete e.duration;
					});
					lists.value = data.data.result.songs;
				});
			},
			{ immediate: true }
		);
		return {
			tabs,
			lists,
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
	}
}
</style>
