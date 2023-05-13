<template>
	<Transition name="lyrics" mode="in-out">
		<div class="app-lyrics overflow" v-show="isShowLyrics" ref="lyricsContent">
			<LyricsBac />
			<div class="lyrics-content">
				<LyricsHeader @enlarge="enlarge" />
				<div class="lyrics-main">
					<LyricsDisc />
					<LyricsSongs />
				</div>
				<LyricsProgress />
			</div>
		</div>
	</Transition>
</template>

<script>
import LyricsBac from './components/lyrics-bac';
import LyricsHeader from './components/lyrics-header';
import LyricsDisc from './components/lyrics-disc';
import LyricsSongs from './components/lyrics-songs';
import LyricsProgress from './components/lyrics-progress.vue';
import AppProgress from '@/components/app-progress';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
export default {
	name: 'AppLyrics',
	components: { LyricsBac, LyricsHeader, LyricsDisc, LyricsSongs, LyricsProgress, AppProgress },
	setup() {
		const lyricsContent = ref(null);
		const store = useStore();
		const isShowLyrics = computed(() => store.state.song.isShowLyrics);
		const enlarge = () => {
			lyricsContent.value.requestFullscreen();
		};
		return { lyricsContent, isShowLyrics, enlarge };
	},
};
</script>

<style lang="less" scoped>
.app-lyrics {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 888;
	background-color: #f6f6f6;
	.lyrics-content {
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		width: 100%;
		height: 100%;
		min-width: 800px;
		.lyrics-main {
			width: 100%;
			display: flex;
			justify-content: space-evenly;
		}
		> .app-progress {
			padding: 0 3rem;
		}
	}
}
/* 进入的起点,离开的终点 */
.lyrics-enter-from,
.lyrics-leave-to {
	transform: translateY(100%);
}
/* 进入进行时,离开进行时 */
.lyrics-enter-active,
.lyrics-leave-active {
	transition: all 0.5s;
}

/* 进入的终点,离开的起点 */
.lyrics-enter-to,
.lyrics-leave {
	transform: translateY(none);
}
</style>
