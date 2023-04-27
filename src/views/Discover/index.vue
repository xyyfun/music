<template>
	<div class="app-discover scroll">
		<div class="discover-content">
			<MusicTitle title="推荐" />
			<AppBanner />
			<DiscoverNewPlaylist />
			<DiscoverNewSong />
			<DiscoverMV />
		</div>
	</div>
</template>

<script>
import MusicTitle from '@/components/library/music-title';
import AppBanner from '@/components/app-banner';
import DiscoverNewPlaylist from './components/discover-new-playlist';
import DiscoverNewSong from './components/discover-new-song';
import DiscoverMV from './components/discover-mv';
export default {
	name: 'AppDiscover',
	components: {
		MusicTitle,
		AppBanner,
		DiscoverNewPlaylist,
		DiscoverNewSong,
		DiscoverMV,
	},
};
</script>

<style lang="less" scoped>
.app-discover {
	flex: 1;
	overflow-y: auto;
	.discover-content {
		padding: 0 1.78rem;
		width: 100%;
		height: 100%;
	}
}
</style>
