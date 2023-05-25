<template>
	<div class="lyrics-disc">
		<div class="disc">
			<div class="arm" :class="{ 'rotate-40': !isPlay }">
				<img src="../../../assets/images/vinyl-arm.png" alt="" />
			</div>
			<div class="record" :style="{ animationPlayState: isPlay ? 'running' : 'paused' }">
				<img v-if="currentMusicID" :src="img" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
	name: 'LyricsDisc',
	setup() {
		const store = useStore();
		return {
			img: computed(() => store.state.song.picUrl),
			isPlay: computed(() => store.state.song.isPlay),
			currentMusicID: computed(() => store.state.song.currentMusicID),
		};
	},
};
</script>

<style lang="less" scoped>
.lyrics-disc {
	display: flex;
	align-items: center;
	.disc {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 50%;
		.arm {
			position: absolute;
			top: -6rem;
			left: 43%;
			z-index: 1;
			transform-origin: 1.3rem 1.3rem;
			transform: rotate(6deg);
			transition: transform 0.5s linear;
			img {
				width: 6.5rem;
				height: 10rem;
			}
		}
		.rotate-40 {
			transform: rotate(-25deg);
		}
		.record {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 20rem;
			height: 20rem;
			background-repeat: no-repeat;
			background-size: 97% 97%;
			background-position: center center;
			background-image: url('../../../assets/images/vinyl-record.png');
			-webkit-clip-path: ellipse(46% 46% at 50% 50%);
			clip-path: ellipse(46% 46% at 50% 50%);
			animation: disc-rotation 10s linear 0s infinite;
			img {
				width: 60%;
				border-radius: 50%;
			}
		}
	}
	@keyframes disc-rotation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
}
</style>
