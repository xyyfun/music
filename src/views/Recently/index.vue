<template>
	<div class="app-recently scroll">
		<div class="recently-content">
			<MusicTitle title="最近播放" />
			<MusicTabs :tabs="tabs" @handlerBac="handlerBac" />
			<template v-if="status === 2">
				<RecentlySong v-if="now === 1" />
				<RecentlyVideo v-if="now === 2" />
			</template>
		</div>
	</div>
</template>

<script>
import MusicTitle from '@/components/library/music-title';
import MusicTabs from '@/components/library/music-tabs';
import RecentlySong from './components/recently-song';
import RecentlyVideo from './components/recently-video';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
export default {
	name: 'AppRecently',
	components: { MusicTitle, MusicTabs, RecentlySong, RecentlyVideo },
	setup() {
		const store = useStore();
		const now = ref(1);
		const tabs = [
			{ title: '歌曲', id: 1 },
			{ title: '视频', id: 2 },
		];
		const handlerBac = id => (now.value = id);
		return { tabs, now, handlerBac, status: computed(() => store.state.user.status) };
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
