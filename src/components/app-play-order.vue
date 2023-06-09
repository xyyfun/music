<template>
	<div class="popup">
		<ul>
			<li
				v-for="item in popup"
				:key="item.order"
				@click="playOrder(item.order)"
				:class="{ active: playOrderNum === item.order }">
				<i class="iconfont" :class="item.icon"></i>{{ item.name }}
			</li>
		</ul>
	</div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
	name: 'AppPlayOrder',
	setup() {
		const store = useStore();
		const popup = [
			{ name: '随机播放', icon: 'icon-suiji', order: 4 },
			{ name: '顺序播放', icon: 'icon-shunxu', order: 2 },
			{ name: '列表循环', icon: 'icon-liebiao', order: 1 },
			{ name: '单曲循环', icon: 'icon-danqu', order: 3 },
		];
		const playOrder = val => {
			store.commit('song/changPlayOrder', val);
		};
		return {
			popup,
			playOrder,
			playOrderNum: computed(() => store.state.song.playOrder),
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
	background-color: var(--global-bg2);
	border-radius: 0.5rem;
	filter: drop-shadow(0 0 10px var(--shadow-black));
	z-index: 11;
	&::after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		border: 0.7rem solid transparent;
		border-top-color: var(--global-bg2);
	}
	ul {
		li {
			padding: 0.5rem;
			text-align: center;
			font-size: 0.85rem;
			cursor: pointer;
			border-bottom: 1px solid var(--global-border2);
			color: var(--text-default-color);
			&:last-child {
				border: none;
			}
			&:hover {
				color: var(--theme-color);
			}
		}
		.active {
			color: var(--theme-color);
		}
	}
}
</style>
