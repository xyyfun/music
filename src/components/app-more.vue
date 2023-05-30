<template>
	<div class="more" ref="target">
		<a v-if="isMore" class="yes" href="javascript:;">努力加载中...</a>
		<a v-else class="not" href="javascript:;">没有更多了...</a>
	</div>
</template>

<script>
import { ref, watch } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
export default {
	name: 'AppMore',
	props: {
		isMore: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['loadMore'],
	setup(props, { emit }) {
		const target = ref(null);
		const targetIsVisible = ref(false);
		const { stop } = useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
			targetIsVisible.value = isIntersecting;
		});
		watch(targetIsVisible, newVal => {
			if (newVal === false) {
				console.log('离开可视区域！');
			} else {
				console.log('进入可视区域！');
			}
			// 出现可视区且拥有更多数据时请求数据
			if (props.isMore && newVal) emit('loadMore');
		});
		return { target };
	},
};
</script>

<style lang="less" scoped>
.more {
	display: flex;
	justify-content: center;
	padding: 2rem 0;
	.yes {
		color: var(--theme-color);
	}
	.not {
		color: #aaa;
	}
}
</style>
