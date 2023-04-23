<template>
	<div class="comment">
		<MusicTitleChild title="评论" />
		<MusicComment :hotComments="hotComments" :comments="comments" />
		<AppMore v-if="comments.length" @loadMore="loadMore" :isMore="isMore" />
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicComment from '@/components/library/music-comment';
import AppMore from '@/components/app-more';
import { getVideoComment, getMvComment, getHotComment } from '@/api/comment';
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue';
export default {
	name: 'PlayerComment',
	components: { MusicTitleChild, MusicComment, AppMore },
	setup() {
		const route = useRoute();
		const comments = ref([]);
		const hotComments = ref([]);
		const isMore = ref(false);
		const offset = ref(1);
		const loadMore = () => {
			offset.value++;
			if (route.query.type === 'video') {
				getVideoAllComment();
			} else {
				getMvAllComment();
			}
		};
		// 视频评论
		const getVideoAllComment = () => {
			getVideoComment(route.query.id, offset.value).then(data => {
				data.data.comments.forEach(e => {
					comments.value.push(e);
				});
				isMore.value = data.data.more;
			});
		};
		// mv评论
		const getMvAllComment = () => {
			getMvComment(route.query.id, offset.value).then(data => {
				data.data.comments.forEach(e => {
					comments.value.push(e);
				});
				isMore.value = data.data.more;
			});
		};
		const HotComment = type => {
			getHotComment(route.query.id, type, 1).then(
				data => (hotComments.value = data.data.hotComments)
			);
		};
		// 监视路由变化获取数据
		watch(
			() => route.query.id,
			newVal => {
				if (newVal) {
					if (route.query.type === 'video') {
						getVideoAllComment();
						HotComment(5);
					} else {
						getMvAllComment();
						HotComment(1);
					}
				}
			},
			{ immediate: true }
		);
		return {
			comments,
			loadMore,
			isMore,
			hotComments,
		};
	},
};
</script>
