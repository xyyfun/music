<template>
	<MusicPlaylistList />
</template>

<script>
import { getUserPlaylist } from '@/api/user';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import MusicPlaylistList from '@/components/library/music-playlist-list';
import { onMounted, onUnmounted, watch } from 'vue';
export default {
	name: 'UserLike',
	components: { MusicPlaylistList },
	setup() {
		const store = useStore();
		const route = useRoute();
		onMounted(() => {
			watch(
				() => route.query.id,
				newVal => {
					if (!newVal) return;
					getUserPlaylist(newVal).then(result => {
						store.dispatch('playlist/getPlaylistDetail', result.data.playlist[0].id);
					});
				},
				{ immediate: true }
			);
		});
		onUnmounted(() => store.commit('playlist/clearData'));
	},
};
</script>

<style></style>
