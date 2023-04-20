<template>
	<div class="app-singer scroll">
		<div class="singer-content">
			<SingerDescription :artist="artist" />
			<MusicTabs :tabs="tabs" :isRouter="false" @handlerBac="handlerBac" />
			<MusicPlaylistList v-if="now === 1" :isShowSinger="false" />
			<SingerSongs v-if="now === 2" />
			<SingerAlbum v-if="now === 3" />
			<SingerVideo v-if="now === 4" />
		</div>
	</div>
</template>

<script>
import SingerDescription from './components/singer-description';
import MusicTabs from '@/components/library/music-tabs';
import SingerSongs from './components/singer-songs';
import MusicPlaylistList from '@/components/library/music-playlist-list';
import SingerAlbum from './components/singer-album';
import SingerVideo from './components/singer-video';
import { getSingerData } from '@/api/singer';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';
export default {
	name: 'AppSinger',
	components: {
		SingerDescription,
		MusicTabs,
		SingerSongs,
		MusicPlaylistList,
		SingerAlbum,
		SingerVideo,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const now = ref(1);
		const artist = ref({});
		const tabs = ref([
			{ title: '精选', id: 1 },
			{ title: '歌曲', id: 2 },
			{ title: '专辑', id: 3 },
			{ title: 'MV', id: 4 },
		]);
		const handlerBac = id => {
			now.value = id;
		};
		getSingerData(route.params.id).then(data => {
			store.commit('playlist/lists', data.data.hotSongs);
			artist.value = data.data.artist;
			tabs.value[1].title += data.data.artist.musicSize - 1;
			tabs.value[2].title += data.data.artist.albumSize;
			tabs.value[3].title += data.data.artist.mvSize;
		});
		return {
			now,
			artist,
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
