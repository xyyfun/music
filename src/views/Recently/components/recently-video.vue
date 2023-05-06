<template>
	<MusicMvList :lists="lists" />
</template>

<script>
import MusicMvList from '@/components/library/music-mv-list';
import { getUserRecordVideo } from '@/api/user';
import { ref, onMounted } from 'vue';
export default {
	name: 'RecentlyVideo',
	components: { MusicMvList },
	setup() {
		const lists = ref([]);
		onMounted(() => {
			getUserRecordVideo().then(data => {
				console.log(data);
				lists.value = data.data.data.list.map(e => {
					e.data.cover = e.data.coverUrl;
					return e.data;
				});
			});
		});
		return { lists };
	},
};
</script>
