<template>
	<div class="app-recently scroll">
		<div class="recently-content">
			<MusicTitle title="最近播放" />
			<MusicPlaylistList />
		</div>
	</div>
</template>

<script>
import MusicTitle from '@/components/library/music-title';
import MusicPlaylistList from '@/components/library/music-playlist-list';
import { getUserPlayRecord } from '@/api/user';
import { computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
export default {
	name: 'AppRecently',
	components: { MusicTitle, MusicPlaylistList },
	setup() {
		const store = useStore();
		const userId = computed(() => store.getters['user/userId']);
		getUserPlayRecord(userId.value).then(data => {
			store.commit(
				'playlist/lists',
				data.data.allData.map(e => e.song)
			);
		});
		onUnmounted(() => store.commit('playlist/clearData'));
	},
};
</script>

<style lang="less" scoped>
.app-recently {
	flex: 1;
	overflow-y: auto;
	.recently-content {
		padding: 0 1.78rem;
	}
}
</style>
