<template>
	<div class="music scroll">
		<div class="music-content">
			<MusicTitle title="音乐馆" />
			<MusicTabs :tabs="tabs" />
			<router-view v-slot="{ Component }">
				<transition name="music">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</div>
</template>

<script>
import MusicTitle from '@/components/library/music-title';
import MusicTabs from '@/components/library/music-tabs';
import { shallowRef } from 'vue';
export default {
	name: 'AppMusic',
	components: { MusicTitle, MusicTabs },
	setup() {
		const tabs = shallowRef([
			{ title: '精选', hash: '/music/picked' },
			{ title: '有声电台', hash: '/music/radio' },
			{ title: '排行', hash: '/music/ranking' },
			{ title: '歌手', hash: '/music/singer' },
			{ title: '分类歌单', hash: '/music/playlist' },
			{ title: '数字专辑', hash: '/music/album' },
		]);
		return { tabs };
	},
};
</script>

<style lang="less" scoped>
.music {
	flex: 1;
	overflow-y: auto;
	.music-content {
		padding: 0 1.78rem;
	}
}
/* 进入的起点,离开的终点 */
.music-enter-from,
.music-leave-to {
	opacity: 0;
}
/* 进入进行时,离开进行时 */
.music-enter-active {
	transition: all 0.5s;
}

/* 进入的终点,离开的起点 */
.music-enter-to,
.music-leave {
	opacity: 1;
}
</style>
