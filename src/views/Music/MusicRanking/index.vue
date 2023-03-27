<template>
	<div class="ranking">
		<RankingOfficialList :officialList="officialList" />
		<RankingFeatureList :featureList="featureList" />
		<RankingArtist />
	</div>
</template>

<script>
import RankingOfficialList from './components/ranking-general-list';
import RankingFeatureList from './components/ranking-feature-list';
import RankingArtist from './components/ranking-artist';
import { getAllList } from '@/api/music';
import { shallowRef } from 'vue';
export default {
	name: 'MusicRanking',
	components: { RankingOfficialList, RankingFeatureList, RankingArtist },
	setup() {
		const officialList = shallowRef([]);
		const featureList = shallowRef([]);
		getAllList().then(data => {
			officialList.value = data.data.list.splice(0, 4);
			data.data.list.forEach(e => {
				e.picUrl = e.coverImgUrl;
				delete e.coverImgUrl;
			});
			featureList.value = data.data.list;
		});
		return { officialList, featureList };
	},
};
</script>
