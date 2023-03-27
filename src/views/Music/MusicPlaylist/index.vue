<template>
	<div class="playlist">
		<PlaylistFilters />
		<PlaylistList />
	</div>
</template>

<script>
import PlaylistFilters from './components/playlist-filters';
import PlaylistList from './components/playlist-list';
export default {
	name: 'MusicPlaylist',
	components: { PlaylistFilters, PlaylistList },
};
</script>
