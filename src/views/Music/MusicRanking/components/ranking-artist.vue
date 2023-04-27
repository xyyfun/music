<template>
	<div class="ranking-artist">
		<div class="artist">
			<MusicTitleChild title="歌手榜" />
			<MusicList :dataList="artistList" params="/singer" />
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicList from '@/components/library/music-list';
import { getArtist } from '@/api/singer';
import { shallowRef } from 'vue';
export default {
	name: 'RankingArtist',
	components: { MusicTitleChild, MusicList },
	setup() {
		const artistList = shallowRef([]);
		getArtist().then(data => {
			const arr = data.data.list.artists.splice(0, 30);
			arr.forEach(e => {
				e.picUrl = e.img1v1Url;
				e.playCount = e.score;
				delete e.score;
				delete e.img1v1Url;
			});
			artistList.value = arr;
		});
		return { artistList };
	},
};
</script>

<style></style>
