<template>
	<div class="discover-new-playlist">
		<div class="playlist overflow">
			<MusicTitleChild title="你的专属歌单" />
			<MusicList :dataList="playlist" params="/playlist" />
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicList from '@/components/library/music-list';
import { getRecommendPlaylist } from '@/api/discover';
import { ref } from 'vue';
export default {
	name: 'DiscoverNewPlaylist',
	components: { MusicTitleChild, MusicList },
	setup() {
		const playlist = ref([]);
		getRecommendPlaylist().then(data => {
			data.data.result.splice(10);
			playlist.value = data.data.result;
		});
		return { playlist };
	},
};
</script>

<style lang="less" scoped>
.discover-new-playlist {
	.playlist {
		width: 100%;
	}
}
</style>
