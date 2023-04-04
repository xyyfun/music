<template>
	<div class="app-singer scroll">
		<div class="singer-content">
			<SingerDescription :artist="artist" />
			<MusicTabs :tabs="tabs" :isRouter="false" @handlerBac="handlerBac" />
			<MusicPlaylistList
				v-if="now === 1"
				:lists="hotSongs"
				:isShowSinger="false"
				:isShowAlbum="true" />
			<SingerAlbum v-if="now === 2" />
			<SingerVideo v-if="now === 3" />
		</div>
	</div>
</template>

<script>
import SingerDescription from './components/singer-description';
import MusicTabs from '@/components/library/music-tabs';
import MusicPlaylistList from '@/components/library/music-playlist-list';
import SingerAlbum from './components/singer-album';
import SingerVideo from './components/singer-video';
import { useDateFormat } from '@vueuse/core';
import { getSingerData } from '@/api/singer';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
export default {
	name: 'AppSinger',
	components: { SingerDescription, MusicTabs, MusicPlaylistList, SingerAlbum, SingerVideo },
	setup() {
		const route = useRoute();
		const now = ref(1);
		const artist = ref({});
		const hotSongs = ref([]);
		const tabs = ref([
			{ title: '歌曲', id: 1 },
			{ title: '专辑', id: 2 },
			{ title: 'MV', id: 3 },
		]);
		const handlerBac = id => {
			now.value = id;
		};
		getSingerData(route.params.id).then(data => {
			data.data.hotSongs.forEach(e => {
				const str = useDateFormat(e.dt, 'mm:ss');
				e.dt = str.value.replace(/\"/g, '');
			});
			artist.value = data.data.artist;
			hotSongs.value = data.data.hotSongs;
			tabs.value[0].title += data.data.artist.musicSize;
			tabs.value[1].title += data.data.artist.albumSize;
			tabs.value[2].title += data.data.artist.mvSize;
		});
		return {
			now,
			artist,
			hotSongs,
			tabs,
			handlerBac,
		};
	},
};
</script>

<style lang="less" scoped>
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
