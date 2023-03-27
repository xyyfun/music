<template>
	<div class="more">
		<a v-if="isMore" class="yes" href="javascript:;" @click="loadMore">加载更多</a>
		<a v-else class="not" href="javascript:;">没有更多了...</a>
	</div>
</template>

<script>
export default {
	name: 'AppMore',
	props: {
		isMore: {
			type: Boolean,
			default: true,
		},
	},
	setup(props, { emit }) {
		const loadMore = () => {
			emit('loadMore');
		};
		return { loadMore };
	},
};
</script>

<style lang="less" scoped>
.more {
	display: flex;
	justify-content: center;
	padding: 2rem 0;
	.yes {
		color: #1ecc94;
	}
	.not {
		color: #aaa;
	}
}
</style>
