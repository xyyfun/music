<template>
	<div class="app-radio-playlist scroll">
		<div class="radio-playlist-content"></div>
	</div>
</template>

<script>
import MusicPlaylistList from '@/components/library/music-playlist-list';
import { djDetail, djList } from '@/api/radio';
import { useRoute } from 'vue-router';
export default {
	name: 'RadioPlaylist',
	components: { MusicPlaylistList },
	setup() {
		const route = useRoute();
		/* djDetail(route.params.id).then(data => {
			console.log(data);
		});
		djList(route.params.id, 1).then(data => {
			console.log(data);
		}); */
	},
};
</script>

<style lang="less" scoped>
.app-radio-playlist {
	flex: 1;
	overflow-y: auto;
	.radio-playlist-content {
		padding: 0 1.78rem;
	}
}
</style>
