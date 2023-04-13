<template>
	<div class="radio-personality">
		<div class="personality">
			<MusicTitleChild title="个性推荐" />
			<MusicList :dataList="lists" params="/radioplaylist" />
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicList from '@/components/library/music-list';
import { getRadioPersonality } from '@/api/music';
import { ref } from 'vue';
export default {
	name: 'RadioPersonality',
	components: { MusicTitleChild, MusicList },
	setup() {
		const lists = ref([]);
		getRadioPersonality().then(data => {
			console.log(data);
			lists.value = data.data.data;
		});
		return { lists };
	},
};
</script>

<style></style>
