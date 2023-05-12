<template>
	<MusicList :dataList="userPlaylist" params="/playlist" />
</template>

<script>
import { getUserPlaylist } from '@/api/user';
import { useRoute } from 'vue-router';
import MusicList from '@/components/library/music-list';
import { ref, onMounted, watch } from 'vue';
export default {
	name: 'UserPlaylist',
	components: { MusicList },
	setup() {
		const route = useRoute();
		const userPlaylist = ref([]);
		onMounted(() => {
			watch(
				() => route.query.id,
				newVal => {
					if (!newVal) return;
					getUserPlaylist(newVal).then(result => {
						const arr = result.data.playlist.splice(1);
						arr.forEach(e => (e.picUrl = e.coverImgUrl));
						userPlaylist.value = arr;
					});
				},
				{ immediate: true }
			);
		});
		return { userPlaylist };
	},
};
</script>

<style></style>
