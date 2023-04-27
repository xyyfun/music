<template>
	<div class="album-new-list">
		<div class="new-list">
			<MusicTitleChild title="最新专辑" />
			<MusicList :dataList="newAlbum" params="/album" />
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicList from '@/components/library/music-list';
import { getNewAlbum } from '@/api/album';
import { shallowRef } from 'vue';
export default {
	name: 'AlbumNewList',
	components: { MusicTitleChild, MusicList },
	setup() {
		const newAlbum = shallowRef([]);
		getNewAlbum().then(data => {
			newAlbum.value = data.data.albums;
		});
		return { newAlbum };
	},
};
</script>
