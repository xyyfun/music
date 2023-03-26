<template>
	<div class="mask"></div>
</template>

<script>
export default {
	name: 'AppMask',
};
</script>

<style lang="less" scoped>
.mask {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5) url('../assets/images/cover_play.png') no-repeat;
	background-position: center center;
	background-size: 3.5rem;
	border-radius: 0.5rem;
	opacity: 0;
	&:hover {
		opacity: 1;
		transition: opacity 0.5s;
	}
}
</style>
