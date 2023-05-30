<template>
	<div class="plays-number" v-if="playCount">
		<i class="iconfont icon-20gf-headphones"></i>
		<span class="ellipsis">{{ playsNumber }}</span>
	</div>
</template>

<script>
import useNumberSwitch from '@/hooks/useNumberSwitch';
export default {
	name: 'MusicPlayCount',
	props: {
		playCount: {
			type: Number,
			default: 0,
		},
	},
	setup(props) {
		const playsNumber = useNumberSwitch(props.playCount);
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
	background-color: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(5px);
	color: var(--text-default2-color);
	border-radius: 0.9rem;
	padding: 0 0.5rem;
	max-width: 100%;
	height: 1.3rem;
	line-height: 1.3rem;
	i {
		font-size: 0.4rem;
		margin-right: 0.2rem;
		&::before {
			vertical-align: top;
		}
	}
	span {
		display: block;
		font-size: 0.5rem;
	}
}
@media screen and (max-width: 800px) {
	.plays-number {
		right: 0;
	}
}
</style>
