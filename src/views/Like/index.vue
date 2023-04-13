<template>
	<div class="app-like scroll">
		<div class="like-content">
			<MusicTitle title="我喜欢" />
			<MusicTabs :tabs="tabs" :isRouter="false" @handlerBac="handlerBac" />
			<MusicPlaylistList v-if="now === 1" />
		</div>
	</div>
</template>

<script>
import MusicTitle from '@/components/library/music-title';
import MusicTabs from '@/components/library/music-tabs';
import MusicPlaylistList from '@//components/library/music-playlist-list';
import { ref, shallowRef } from 'vue';
export default {
	name: 'AppLike',
	components: { MusicTitle, MusicTabs, MusicPlaylistList },
	setup() {
		const now = ref(1);
		const tabs = shallowRef([
			{ title: '歌曲', id: 1 },
			{ title: '歌单', id: 2 },
			{ title: '专辑', id: 3 },
			{ title: '主播电台', id: 4 },
			{ title: '视频', id: 5 },
		]);
		const handlerBac = id => {
			now.value = id;
		};
		return { tabs, now, handlerBac };
	},
};
</script>

<style lang="less" scoped>
.app-like {
	flex: 1;
	overflow-y: auto;
	.like-content {
		padding: 0 1.78rem;
	}
}
</style>
