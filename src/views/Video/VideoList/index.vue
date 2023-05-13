<template>
	<div class="video-lists">
		<div class="lists">
			<VideoTabs />
			<MusicVideoList :videoList="lists" />
			<AppMore v-if="lists.length" @loadMore="loadMore" :isMore="isMore" />
		</div>
	</div>
</template>

<script>
import VideoTabs from './components/video-tabs';
import MusicVideoList from '@/components/library/music-video-list';
import AppMore from '@/components/app-more';
import { getVideo, getVideoAll } from '@/api/video';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
export default {
	name: 'VideoLists',
	components: { VideoTabs, MusicVideoList, AppMore },
	setup() {
		const route = useRoute();
		const lists = ref([]);
		const offset = ref(1);
		const isMore = ref(true);
		// 加载更多
		const loadMore = () => {
			offset.value++;
			const id = route.query.id;
			if (id) {
				getVideo(id, offset.value).then(data => {
					data.data.datas.forEach(e => lists.value.push(e.data));
					isMore.value = data.data.hasmore;
				});
			} else {
				getVideoAll(offset.value).then(data => {
					data.data.datas.forEach(e => lists.value.push(e.data));
					isMore.value = data.data.hasmore;
				});
			}
		};
		watch(
			() => route.query.id,
			newVal => {
				if (route.name === 'video') {
					offset.value = 1;
					if (newVal) {
						getVideo(newVal, offset.value).then(data => {
							lists.value = data.data.datas.map(e => e.data);
							isMore.value = data.data.hasmore;
						});
					} else {
						getVideoAll(offset.value).then(data => {
							lists.value = data.data.datas.map(e => e.data);
							isMore.value = data.data.hasmore;
						});
					}
				}
			},
			{ immediate: true }
		);
		return {
			lists,
			loadMore,
			isMore,
		};
	},
};
</script>

<style></style>
