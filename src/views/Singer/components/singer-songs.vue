<template>
	<MusicPlaylistList :lists="allSongs" :isShowSinger="false" />
	<AppMore @loadMore="loadMore" :isMore="isMore" />
</template>

<script>
import MusicPlaylistList from '@/components/library/music-playlist-list';
import AppMore from '@/components/app-more';
import { getSingerAllSongs } from '@/api/singer';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useDateFormat } from '@vueuse/core';
export default {
	name: 'SingerSongs',
	components: { MusicPlaylistList, AppMore },
	setup() {
		const route = useRoute();
		const allSongs = ref([]);
		const limit = ref(50);
		const isMore = ref(true);
		const loadMore = () => {
			limit.value += 50;
			getData();
		};
		const getData = () => {
			getSingerAllSongs(route.params.id, limit.value).then(data => {
				console.log(data);
				isMore.value = data.data.more;
				data.data.songs.forEach(e => {
					e.dt = useDateFormat(e.dt, 'mm:ss');
				});
				allSongs.value = data.data.songs;
			});
		};
		getData();
		return { allSongs, loadMore, isMore };
	},
};
</script>
