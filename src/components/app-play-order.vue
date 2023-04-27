<template>
	<div class="popup">
		<ul>
			<li @click="playOrder(4)"><i class="iconfont icon-suiji"></i>随机播放</li>
			<li @click="playOrder(2)"><i class="iconfont icon-shunxu"></i>顺序播放</li>
			<li @click="playOrder(1)"><i class="iconfont icon-liebiao"></i>列表循环</li>
			<li @click="playOrder(3)"><i class="iconfont icon-danqu"></i>单曲循环</li>
		</ul>
	</div>
</template>

<script>
import { useStore } from 'vuex';
export default {
	name: 'AppPlayOrder',
	emits: ['popupCbk'],
	setup(props, { emit }) {
		const store = useStore();
		const playOrder = val => {
			store.commit('song/changPlayOrder', val);
			emit('popupCbk');
		};
		return {
			playOrder,
		};
	},
};
</script>

<style lang="less" scoped>
.popup {
	position: absolute;
	bottom: 160%;
	left: -160%;
	width: 7rem;
	background-color: #fff;
	border-radius: 0.5rem;
	filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.2));
	z-index: 11;
	&::after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		border: 0.7rem solid transparent;
		border-top-color: #fff;
	}
	ul {
		li {
			padding: 0.5rem;
			text-align: center;
			font-size: 0.85rem;
			cursor: pointer;
			border-bottom: 1px solid #eee;
			color: #000;
			&:last-child {
				border: none;
			}
			&:hover {
				color: #1ecc94;
			}
		}
	}
}
</style>
