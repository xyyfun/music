<template>
	<div class="video-lists">
		<div class="lists">
			<VideoTabs @changVideoLists="changVideoLists" />
			<MusicVideoList :videoList="lists" />
			<AppMore @loadMore="loadMore" :isMore="isMore" />
		</div>
	</div>
</template>

<script>
import VideoTabs from './components/video-tabs';
import MusicVideoList from '@/components/library/music-video-list';
import AppMore from '@/components/app-more';
import { getVideo, getVideoAll } from '@/api/video';
import { ref } from 'vue';
export default {
	name: 'VideoLists',
	components: { VideoTabs, MusicVideoList, AppMore },
	setup() {
		const lists = ref([]);
		const offset = ref(0);
		const id = ref(null);
		const isMore = ref(true);
		// 加载更多
		const loadMore = () => {
			offset.value++;
			if (id.value) {
				getVideo(id.value, offset.value).then(data => {
					data.data.datas.forEach(e => lists.value.push(e));
					isMore.value = data.data.hasmore;
				});
			} else {
				getVideoAll(offset.value).then(data => {
					data.data.datas.forEach(e => lists.value.push(e));
					isMore.value = data.data.hasmore;
				});
			}
		};
		// 根据标签获取视频
		const changVideoLists = v => {
			id.value = v;
			offset.value = 0;
			if (v) {
				getVideo(id.value, offset.value).then(data => {
					lists.value = data.data.datas;
					isMore.value = data.data.hasmore;
				});
			} else {
				getAllData();
			}
		};
		// 获取全部视频
		const getAllData = () => {
			getVideoAll(offset.value).then(data => {
				lists.value = data.data.datas;
				isMore.value = data.data.hasmore;
			});
		};
		getAllData();
		return {
			lists,
			changVideoLists,
			loadMore,
			isMore,
		};
	},
};
</script>

<style></style>
