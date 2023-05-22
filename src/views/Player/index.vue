<template>
	<div class="app-player scroll">
		<div class="player-content">
			<PlayerPlayVideo :isVisible="isVisible" ref="player" />
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
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';
export default {
	name: 'AppPlayer',
	components: { PlayerPlayVideo, PlayerDetail, PlayerRelated, PlayerComment },
	setup() {
		const player = ref(null);
		const isVisible = ref(true);
		const { stop } = useIntersectionObserver(player, ([{ isIntersecting }], observerElement) => {
			isVisible.value = isIntersecting;
		});
		return {
			player,
			isVisible,
		};
	},
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
