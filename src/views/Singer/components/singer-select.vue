<template>
	<MusicPlaylistList :isShowSinger="false" />
</template>

<script>
import MusicPlaylistList from '@/components/library/music-playlist-list';
import { getSingerHotSong } from '@/api/singer';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { onMounted, watch } from 'vue';
export default {
	name: 'SingerSelect',
	components: { MusicPlaylistList },
	setup() {
		const store = useStore();
		const route = useRoute();
		onMounted(() => {});
		watch(
			() => route.params.id,
			newVal => {
				store.commit('playlist/clearData');
				if (newVal && route.name === 'singer') {
					getSingerHotSong(newVal).then(data => {
						store.commit('playlist/lists', data.data.songs);
					});
				}
			},
			{ immediate: true }
		);
	},
};
</script>

<style></style>
