<template>
	<div class="lyrics-header">
		<div class="header">
			<i class="iconfont icon-xiangxiajiantou" @click="$emit('closePanel')"></i>
			<i
				class="iconfont"
				:class="isFull ? 'icon-quxiaoquanping' : 'icon-quanping'"
				@click="$emit('enlarge')"></i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LyricsHeader',
	emits: ['enlarge', 'closePanel'],
	props: {
		isFull: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="less" scoped>
.lyrics-header {
	width: 100%;
	height: 4.2rem;
	.header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 2rem;
		i {
			color: var(--text-default2-color);
			font-size: 2rem;
			cursor: pointer;
		}
	}
}
</style>
