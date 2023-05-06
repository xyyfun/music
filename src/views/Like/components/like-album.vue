<template>
	<MusicList :dataList="lists" params="/album" />
</template>

<script>
import MusicList from '@/components/library/music-list';
import { getUserCollectAlbum } from '@/api/album';
import { onMounted, ref } from 'vue';
export default {
	name: 'LikeAlbum',
	components: { MusicList },
	setup() {
		const lists = ref([]);
		onMounted(() => {
			getUserCollectAlbum().then(data => {
				lists.value = data.data.data;
				console.log(data);
			});
		});
		return { lists };
	},
};
</script>

<style></style>
