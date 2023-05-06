<template>
	<div class="app-like scroll">
		<div class="like-content">
			<MusicTitle title="我喜欢" />
			<MusicTabs :tabs="tabs" :isRouter="false" @handlerBac="handlerBac" />
			<LikeSong v-if="now === 1" />
			<LikeAlbum v-if="now === 2" />
			<LikeVideo v-if="now === 4" />
		</div>
	</div>
</template>

<script>
import MusicTitle from '@/components/library/music-title';
import MusicTabs from '@/components/library/music-tabs';
import LikeSong from './components/like-song';
import LikeAlbum from './components/like-album';
import LikeVideo from './components/like-video';
import { ref, shallowRef } from 'vue';
export default {
	name: 'AppLike',
	components: { MusicTitle, MusicTabs, LikeSong, LikeAlbum, LikeVideo },
	setup() {
		const now = ref(1);
		const tabs = shallowRef([
			{ title: '歌曲', id: 1 },
			{ title: '专辑', id: 2 },
			{ title: '主播电台', id: 3 },
			{ title: '视频', id: 4 },
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
