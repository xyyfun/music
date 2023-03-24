<template>
	<div class="title">{{ title }}<i class="iconfont icon-xiangyoujiantou"></i></div>
</template>

<script>
export default {
	name: 'MusicTitle',
	props: ['title'],
};
</script>

<style lang="less" scoped>
.title {
	display: flex;
	align-items: center;
	padding: 1rem 0;
	font-size: 1.42rem;
	i {
		font-size: 1rem;
	}
}
</style>
