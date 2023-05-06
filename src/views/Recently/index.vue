<template>
	<div class="app-recently scroll">
		<div class="recently-content">
			<MusicTitle title="最近播放" />
			<MusicTabs :tabs="tabs" @handlerBac="handlerBac" />
			<RecentlySong v-if="now === 1" />
			<RecentlyVideo v-if="now === 2" />
		</div>
	</div>
</template>

<script>
import MusicTitle from '@/components/library/music-title';
import MusicTabs from '@/components/library/music-tabs';
import RecentlySong from './components/recently-song';
import RecentlyVideo from './components/recently-video';
import { ref } from 'vue';
export default {
	name: 'AppRecently',
	components: { MusicTitle, MusicTabs, RecentlySong, RecentlyVideo },
	setup() {
		const now = ref(1);
		const tabs = [
			{ title: '歌曲', id: 1 },
			{ title: '视频', id: 2 },
		];
		const handlerBac = id => (now.value = id);
		return { tabs, now, handlerBac };
	},
};
</script>

<style lang="less" scoped>
.app-recently {
	flex: 1;
	overflow-y: auto;
	.recently-content {
		padding: 0 1.78rem;
	}
}
</style>
