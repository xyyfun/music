<template>
	<div class="picked-program">
		<div class="program">
			<MusicTitleChild title="精彩节目推荐" />
			<MusicList :dataList="programs" />
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicList from '@/components/library/music-list';
import { getRecommendProgram } from '@/api/music';
import { shallowRef } from 'vue';
export default {
	name: 'PickedProgram',
	components: { MusicTitleChild, MusicList },
	setup() {
		const programs = shallowRef([]);
		getRecommendProgram().then(data => {
			data.data.programs.forEach(e => {
				e.picUrl = e.coverUrl;
				delete e.coverUrl;
			});
			programs.value = data.data.programs;
		});
		return { programs };
	},
};
</script>
