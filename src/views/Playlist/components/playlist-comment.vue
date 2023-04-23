<template>
	<MusicComment :comments="comments" :hotComments="hotComments" />
	<AppMore v-if="comments.length" @loadMore="loadMore" :isMore="isMore" />
</template>

<script>
import MusicComment from '@/components/library/music-comment';
import AppMore from '@/components/app-more';
import { getHotComment, getPlaylistComment } from '@/api/comment';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
export default {
	name: 'PlaylistComment',
	components: { MusicComment, AppMore },
	setup() {
		const route = useRoute();
		const comments = ref([]);
		const hotComments = ref([]);
		const isMore = ref(false);
		const offset = ref(1);
		const loadMore = () => {
			offset.value++;
			getAllComment();
		};
		const getAllComment = () => {
			getPlaylistComment(route.params.id, offset.value).then(data => {
				data.data.comments.forEach(e => {
					comments.value.push(e);
				});
				isMore.value = data.data.more;
			});
		};
		// 监视路由变化
		watch(
			() => route.params.id,
			newVal => {
				if (newVal && route.name === 'playlist') {
					getAllComment();
					getHotComment(newVal, 2, 1).then(data => (hotComments.value = data.data.hotComments));
				}
			},
			{ immediate: true }
		);
		return {
			loadMore,
			comments,
			hotComments,
			isMore,
		};
	},
};
</script>

<style></style>
