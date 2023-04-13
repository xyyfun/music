<template>
	<div class="play-bac" :style="{ backgroundImage: `url(${bac})` }"></div>
	<div class="play-mask"></div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
	name: 'LyricsBac',
	setup() {
		const store = useStore();
		return { bac: computed(() => store.state.song.picUrl) };
	},
};
</script>

<style lang="less" scoped>
div {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.play-bac {
		z-index: -2;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 50%;
		transform: scale(1.2);
		filter: blur(65px);
	}
	.play-mask {
		background-color: rgba(0, 0, 0, 0.35);
		z-index: -1;
	}
}
</style>
