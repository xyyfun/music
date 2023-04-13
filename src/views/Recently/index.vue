<template>
	<div class="app-recently scroll">
		<div class="recently-content">
			<MusicTitle title="最近播放" />
			<MusicPlaylistList :lists="playRecord" />
		</div>
	</div>
</template>

<script>
import MusicTitle from '@/components/library/music-title';
import MusicPlaylistList from '@/components/library/music-playlist-list';
import { getUserPlayRecord } from '@/api/user';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useDateFormat } from '@vueuse/core';
export default {
	name: 'AppRecently',
	components: { MusicTitle, MusicPlaylistList },
	setup() {
		const store = useStore();
		const playRecord = ref([]);
		const userId = computed(() => store.getters['user/userId']);
		getUserPlayRecord(userId.value).then(data => {
			console.log(data);
			playRecord.value = data.data.allData.map(e => {
				e.song.dt = useDateFormat(e.song.dt, 'mm:ss');
				return e.song;
			});
		});
		return {
			playRecord,
		};
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
