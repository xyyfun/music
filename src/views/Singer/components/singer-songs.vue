<template>
	<MusicPlaylistList :isShowSinger="false" />
	<AppMore v-if="isShowMore" @loadMore="loadMore" :isMore="isMore" />
</template>

<script>
import MusicPlaylistList from '@/components/library/music-playlist-list';
import AppMore from '@/components/app-more';
import { getSingerAllSongs } from '@/api/singer';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ref, watch } from 'vue';
export default {
	name: 'SingerSongs',
	components: { MusicPlaylistList, AppMore },
	setup() {
		const store = useStore();
		const route = useRoute();
		const offset = ref(2);
		const isMore = ref(true);
		const isShowMore = ref(false);
		const loadMore = () => {
			offset.value++;
			getData();
		};
		const getData = () => {
			getSingerAllSongs(route.params.id, offset.value).then(data => {
				isMore.value = data.data.more;
				store.commit('playlist/lists', data.data.songs);
				isShowMore.value = true;
			});
		};
		watch(
			() => route.params.id,
			newVal => {
				store.commit('playlist/clearData');
				if (newVal && route.name === 'singer') getData();
			},
			{ immediate: true }
		);
		return { loadMore, isMore, isShowMore };
	},
};
</script>
