<template>
	<MusicComment :comments="comments" :hotComments="hotComments" />
	<AppMore v-if="comments.length" @loadMore="loadMore" :isMore="isMore" />
</template>

<script>
import MusicComment from '@/components/library/music-comment';
import AppMore from '@/components/app-more';
import { getHotComment, getAlbumComment } from '@/api/comment';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
export default {
	name: 'AlbumComment',
	components: { MusicComment, AppMore },
	setup() {
		const route = useRoute();
		const offset = ref(1);
		const comments = ref([]);
		const hotComments = ref([]);
		const isMore = ref(false);
		const loadMore = () => {
			offset.value++;
			getAllComment();
		};
		const getAllComment = () => {
			getAlbumComment(route.params.id, offset.value).then(data => {
				data.data.comments.forEach(e => comments.value.push(e));
				isMore.value = data.data.more;
			});
		};
		// 监视路由变化
		watch(
			() => route.params.id,
			newVal => {
				if (newVal && route.name === 'album') {
					getAllComment();
					getHotComment(newVal, 3, 1).then(data => (hotComments.value = data.data.hotComments));
				}
			},
			{ immediate: true }
		);
		return {
			loadMore,
			isMore,
			comments,
			hotComments,
		};
	},
};
</script>

<style></style>
