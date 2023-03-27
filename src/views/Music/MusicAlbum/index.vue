<template>
	<div class="album">
		<AlbumHotList />
		<AlbumAllList />
	</div>
</template>

<script>
import AlbumHotList from './components/album-hot-list';
import AlbumAllList from './components/album-all-list';
export default {
	name: 'MusicAlbum',
	components: { AlbumHotList, AlbumAllList },
};
</script>
