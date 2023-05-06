<template>
	<MusicPlaylistList />
</template>

<script>
import MusicPlaylistList from '@/components/library/music-playlist-list';
import { getUserRecordSong } from '@/api/user';
import { onUnmounted } from 'vue';
import { useStore } from 'vuex';
export default {
	name: 'RecentlySong',
	components: { MusicPlaylistList },
	setup() {
		const store = useStore();
		getUserRecordSong().then(data => {
			store.commit(
				'playlist/lists',
				data.data.data.list.map(e => e.data)
			);
		});
		onUnmounted(() => store.commit('playlist/clearData'));
	},
};
</script>
