<template>
	<div class="app-video scroll">
		<div class="video-content">
			<MusicTitle title="视频" />
			<MusicTabs :tabs="tabs" :isRouter="false" @handlerBac="handlerBac" />
			<VideoLists v-if="nowTab === 1" />
			<MvList v-if="nowTab === 2" />
		</div>
	</div>
</template>

<script>
import MusicTitle from '@/components/library/music-title';
import MusicTabs from '@/components/library/music-tabs';
import VideoLists from './VideoList';
import MvList from './MvList';
import { ref } from 'vue';
export default {
	name: 'AppVideo',
	components: { MusicTitle, MusicTabs, VideoLists, MvList },
	setup() {
		const tabs = [
			{ title: '视频', id: 1 },
			{ title: 'MV', id: 2 },
		];
		const nowTab = ref(1);
		const handlerBac = id => (nowTab.value = id);
		return { tabs, nowTab, handlerBac };
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
