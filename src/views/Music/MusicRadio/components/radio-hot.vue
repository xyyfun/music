<template>
	<div class="radio-hot">
		<div class="hot">
			<MusicTitleChild title="热门电台" />
			<MusicList :dataList="djRadios" />
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicList from '@/components/library/music-list';
import { getRadioHot } from '@/api/music';
import { shallowRef } from 'vue';
export default {
	name: 'RadioHot',
	components: { MusicTitleChild, MusicList },
	setup() {
		const djRadios = shallowRef([]);
		getRadioHot().then(data => {
			djRadios.value = data.data.djRadios;
		});
		return { djRadios };
	},
};
</script>
