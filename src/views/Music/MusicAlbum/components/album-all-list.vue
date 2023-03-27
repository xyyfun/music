<template>
	<div class="album-all-list">
		<div class="all-list">
			<MusicTitleChild title="全部专辑" />
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import { getAlbum } from '@/api/music';
export default {
	name: 'AlbumAllList',
	components: { MusicTitleChild },
	setup() {
		// getAlbum().then(data => {
		// 	console.log(data);
		// });
	},
};
</script>

<style></style>
