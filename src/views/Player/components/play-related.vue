<template>
	<div class="related">
		<MusicTitleChild :title="title" />
		<MusicVideoList :videoList="videoList" v-if="videoList.length" />
		<MusicMvList :lists="mvList" v-if="mvList.length" />
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicMvList from '@/components/library/music-mv-list';
import MusicVideoList from '@/components/library/music-video-list';
import { getRelatedVideo, getRelatedMv } from '@/api/video';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
export default {
	name: 'PlayRelated',
	components: { MusicTitleChild, MusicVideoList, MusicMvList },
	setup() {
		const route = useRoute();
		const title = ref(null);
		const videoList = ref([]);
		const mvList = ref([]);
		onMounted(() => {
			if (route.query.type === 'video') {
				title.value = '相关视频';
				getRelatedVideo(route.query.id).then(data => {
					videoList.value = data.data.data.map(e => {
						const obj = {};
						e.creator = e.creator[0];
						obj.data = e;
						return obj;
					});
				});
			} else {
				title.value = '相似MV';
				getRelatedMv(route.query.id).then(data => {
					mvList.value = data.data.mvs;
				});
			}
		});
		return {
			title,
			videoList,
			mvList,
		};
	},
};
</script>
