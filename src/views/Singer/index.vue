<template>
	<div class="app-singer scroll">
		<div class="singer-content">
			<SingerDescription />
			<MusicTabs :tabs="tabs" :isRouter="false" @handlerBac="handlerBac" />
			<SingerSelect v-if="now === 1" />
			<SingerSongs v-if="now === 2" />
			<SingerAlbum v-if="now === 3" />
			<SingerVideo v-if="now === 4" />
		</div>
	</div>
</template>

<script>
import SingerDescription from './components/singer-description';
import MusicTabs from '@/components/library/music-tabs';
import SingerSelect from './components/singer-select';
import SingerSongs from './components/singer-songs';
import SingerAlbum from './components/singer-album';
import SingerVideo from './components/singer-video';
import { ref } from 'vue';
export default {
	name: 'AppSinger',
	components: {
		SingerDescription,
		MusicTabs,
		SingerSongs,
		SingerSelect,
		SingerAlbum,
		SingerVideo,
	},
	setup() {
		const now = ref(1);
		const tabs = ref([
			{ title: '精选', id: 1 },
			{ title: '歌曲', id: 2 },
			{ title: '专辑', id: 3 },
			{ title: 'MV', id: 4 },
		]);
		const handlerBac = id => (now.value = id);
		return {
			now,
			tabs,
			handlerBac,
		};
	},
};
</script>

<style lang="less">
.app-singer {
	flex: 1;
	overflow-y: auto;
	.singer-content {
		> .tabs,
		.music-playlist-list {
			padding: 0 1.78rem;
		}
	}
}
</style>
