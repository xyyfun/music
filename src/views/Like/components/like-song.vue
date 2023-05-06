<template>
	<MusicPlaylistList />
</template>

<script>
import MusicPlaylistList from '@//components/library/music-playlist-list';
import { useStore } from 'vuex';
import { onMounted, onUnmounted, watch } from 'vue';
export default {
	name: 'LikeSong',
	components: { MusicPlaylistList },
	setup() {
		const store = useStore();
		onMounted(() => {
			watch(
				() => store.state.user.usersongLike,
				newVal => {
					if (newVal) store.dispatch('playlist/getPlaylistDetail', newVal);
				},
				{ immediate: true }
			);
		});
		onUnmounted(() => store.commit('playlist/clearData'));
	},
};
</script>

<style></style>
