<template>
	<div class="app-player scroll">
		<div class="player-content">
			<PlayerPlayVideo />
			<PlayDetail />
			<PlayRelated />
		</div>
	</div>
</template>

<script>
import PlayerPlayVideo from './components/player-play-video';
import PlayDetail from './components/play-detail';
import PlayRelated from './components/play-related';
export default {
	name: 'AppPlayer',
	components: { PlayerPlayVideo, PlayDetail, PlayRelated },
};
</script>

<style scoped lang="less">
.app-player {
	flex: 1;
	overflow-y: auto;
	.player-content {
		> div {
			padding: 0 1.78rem;
			&:first-child {
				padding: 0;
			}
		}
	}
}
</style>
