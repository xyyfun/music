<template>
	<div class="lyrics-header">
		<div class="header">
			<i class="iconfont icon-xiangxiajiantou" @click="$store.commit('song/SHOWLYRICS', false)"></i>
			<i class="iconfont icon-quanping"></i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LyricsHeader',
	emits: ['changShow'],
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
			filter: invert(100%);
			font-size: 2rem;
			cursor: pointer;
		}
	}
}
</style>
