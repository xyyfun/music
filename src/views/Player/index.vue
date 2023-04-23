<template>
	<div class="app-player scroll">
		<div class="player-content">
			<PlayerPlayVideo />
			<PlayerDetail />
			<PlayerRelated />
			<PlayerComment />
		</div>
	</div>
</template>

<script>
import PlayerPlayVideo from './components/player-play-video';
import PlayerDetail from './components/player-detail';
import PlayerRelated from './components/player-related';
import PlayerComment from './components/player-comment';
export default {
	name: 'AppPlayer',
	components: { PlayerPlayVideo, PlayerDetail, PlayerRelated, PlayerComment },
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
