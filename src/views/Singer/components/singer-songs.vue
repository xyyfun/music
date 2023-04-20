<template>
	<MusicPlaylistList :isShowSinger="false" />
	<AppMore @loadMore="loadMore" :isMore="isMore" />
</template>

<script>
import MusicPlaylistList from '@/components/library/music-playlist-list';
import AppMore from '@/components/app-more';
import { getSingerAllSongs } from '@/api/singer';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useDateFormat } from '@vueuse/core';
export default {
	name: 'SingerSongs',
	components: { MusicPlaylistList, AppMore },
	setup() {
		const store = useStore();
		const route = useRoute();
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
				store.commit('playlist/lists', data.data.songs);
			});
		};
		getData();
		return { loadMore, isMore };
	},
};
</script>
