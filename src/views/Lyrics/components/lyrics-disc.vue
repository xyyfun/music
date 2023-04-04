<template>
	<div class="lyrics-disc">
		<div class="disc" :style="{ backgroundImage: `url(${img})` }">
			<img src="../../../assets/images/album_cover_player.png" alt="" />
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
		width: 18rem;
		height: 18rem;
		background-color: #333;
		background: url('../../../assets/images/not-played.png') no-repeat;
		background-size: cover;
		border-radius: 0.5rem;
		img {
			width: 100%;
			height: 100%;
			position: absolute;
			top: -5px;
			right: -34px;
		}
	}
}
</style>
