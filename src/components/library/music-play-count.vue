<template>
	<div class="plays-number" v-if="playCount">
		<i class="iconfont icon-20gf-headphones"></i>
		<span class="ellipsis">{{ playsNumber }}</span>
	</div>
</template>

<script>
import { computed } from 'vue';
export default {
	name: 'MusicPlayCount',
	props: {
		playCount: {
			type: Number,
			default: 0,
		},
	},
	setup(props) {
		const playsNumber = computed(() => {
			const source = props.playCount; // 源数据
			const num = props.playCount.toString().length; // 数据长度
			if (num <= 4) {
				// 千单位
				return (source / 1000).toFixed(2) + '千';
			} else if (num <= 8) {
				// 千-千万
				return (source / 10000).toFixed(2) + '万';
			} else {
				// 亿
				return (source / 100000000).toFixed(2) + '亿';
			}
		});
		return { playsNumber };
	},
};
</script>

<style lang="less" scoped>
.plays-number {
	position: absolute;
	display: flex;
	overflow: hidden;
	bottom: 5%;
	right: 5%;
	background-color: rgba(0, 0, 0, 0.5);
	color: #fff;
	border-radius: 0.9rem;
	padding: 0.1rem 0.5rem;
	font-size: 0.5rem;
	max-width: 100%;
	i {
		font-size: 0.4rem;
	}
	span {
		display: block;
	}
}
@media screen and (max-width: 800px) {
	.plays-number {
		right: 0;
	}
}
</style>
