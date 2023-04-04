<template>
	<div class="ranking-feature-list">
		<div class="feature-list">
			<MusicTitleChild title="特色榜" />
			<MusicList :dataList="featureList" params="/playlist" />
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicList from '@/components/library/music-list';
export default {
	name: 'RankingFeatureList',
	components: { MusicTitleChild, MusicList },
	props: {
		featureList: {
			type: Array,
			default: () => [],
		},
	},
};
</script>
