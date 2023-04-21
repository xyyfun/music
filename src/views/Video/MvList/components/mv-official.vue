<template>
	<div class="official">
		<MusicTitleChild title="官方出品" />
		<MusicMvList :lists="lists" />
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicMvList from '@/components/library/music-mv-list';
import { getOfficialMv } from '@/api/video';
import { ref } from 'vue';
export default {
	name: 'MvOfficial',
	components: { MusicTitleChild, MusicMvList },
	setup() {
		const lists = ref([]);
		getOfficialMv().then(data => (lists.value = data.data.data));
		return { lists };
	},
};
</script>
