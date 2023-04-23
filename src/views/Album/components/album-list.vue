<template>
	<MusicPlaylistList :isShowAlbum="false" />
</template>

<script>
import MusicPlaylistList from '@/components/library/music-playlist-list';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { watch } from 'vue';
export default {
	name: 'AlbumList',
	components: { MusicPlaylistList },
	setup() {
		const route = useRoute();
		const store = useStore();
		// 监视路由变化
		watch(
			() => route.params.id,
			newVal => {
				if (newVal && route.name === 'album') store.dispatch('playlist/getAlbumDetail', newVal);
			},
			{ immediate: true }
		);
	},
};
</script>

<style></style>
