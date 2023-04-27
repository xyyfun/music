<template>
	<div class="album">
		<AlbumNewList />
		<AlbumAllList />
	</div>
</template>

<script>
import AlbumNewList from './components/album-new-list';
import AlbumAllList from './components/album-all-list';
export default {
	name: 'MusicAlbum',
	components: { AlbumNewList, AlbumAllList },
};
</script>
