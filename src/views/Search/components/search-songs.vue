<template>
	<MusicPlaylistList :lists="lists" :isShowPrivilege="false" />
	<MusicPagination
		:pageNo="pageNo"
		:pageSize="pageSize"
		:totalPages="totalPages"
		:continues="5"
		@changePage="changePage" />
</template>

<script>
import MusicPlaylistList from '@/components/library/music-playlist-list';
import MusicPagination from '@/components/library/music-pagination';
import { search } from '@/api/search';
import { useRoute } from 'vue-router';
import { useDateFormat } from '@vueuse/core';
import { ref, watch } from 'vue';
export default {
	name: 'SearchSongs',
	components: { MusicPlaylistList, MusicPagination },
	emits: ['viewsTop'],
	setup(props, { emit }) {
		const route = useRoute();
		const pageNo = ref(1);
		const pageSize = ref(60);
		const totalPages = ref(null);
		const lists = ref([]);
		const changePage = num => (pageNo.value = num);
		watch(
			[() => route.params.keyword, pageNo],
			([keyword, pageNo]) => {
				search(keyword, pageSize.value, 1, pageNo).then(data => {
					data.data.result.songs.forEach(e => {
						e.al = e.album;
						e.ar = e.artists;
						e.dt = useDateFormat(e.duration, 'mm:ss');
						delete e.album;
						delete e.artists;
						delete e.duration;
					});
					lists.value = data.data.result.songs;
					totalPages.value = Math.floor(data.data.result.songCount / 60);
					emit('viewsTop');
				});
			},
			{ immediate: true }
		);
		return {
			lists,
			pageNo,
			pageSize,
			totalPages,
			changePage,
		};
	},
};
</script>
