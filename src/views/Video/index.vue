<template>
	<div class="app-video scroll">
		<div class="video-content">
			<MusicTitle title="视频" />
			<ul>
				<li v-for="item in tabLists">{{ item.name }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
import MusicTitle from '@/components/library/music-title';
import { getVideoTagList, getVideo } from '@/api/video';
import { ref } from 'vue';
export default {
	name: 'AppVideo',
	components: { MusicTitle },
	setup(props) {
		const tabLists = ref([]);
		getVideoTagList().then(data => {
			console.log(data);
			tabLists.value = data.data.data;
		});
		getVideo(4105).then(data => {
			console.log(data);
		});
		return { tabLists };
	},
};
</script>

<style lang="less">
.app-video {
	flex: 1;
	overflow-y: auto;
	.video-content {
		padding: 0 1.78rem;
	}
}
</style>
