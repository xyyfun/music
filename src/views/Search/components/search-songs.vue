<template>
	<MusicPlaylistList :isShowPrivilege="false" />
	<AppMore v-if="songLists.length" @loadMore="loadMore" :isMore="isMore" />
</template>

<script>
import MusicPlaylistList from '@/components/library/music-playlist-list';
import AppMore from '@/components/app-more';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import useSearch from '@/hooks/useSearch';
export default {
	name: 'SearchSongs',
	components: { MusicPlaylistList, AppMore },
	setup() {
		const store = useStore();
		const route = useRoute();
		const offset = ref(1);
		const isMore = ref(false);
		const loadMore = () => {
			offset.value++;
			getData();
		};
		const clearData = () => {
			offset.value = 1;
			isMore.value = false;
			store.commit('playlist/clearData');
		};
		const getData = () => {
			const keyword = route.params.keyword;
			useSearch(keyword, 'songs', offset.value, (val, hasMore) => {
				store.commit('playlist/lists', val);
				isMore.value = hasMore;
			});
		};
		onMounted(() => {
			watch(
				() => route.params.keyword,
				(new_keyword, old_keyword) => {
					if (new_keyword !== old_keyword) clearData();
					getData();
				},
				{ immediate: true }
			);
		});
		onUnmounted(() => store.commit('playlist/clearData'));
		return { loadMore, isMore, songLists: computed(() => store.state.playlist.songLists) };
	},
};
</script>
