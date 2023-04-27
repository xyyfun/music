<template>
	<div class="sound">
		<div class="volume">
			<div class="slot" ref="slot">
				<div class="complete" :style="{ transform: `scaleY(${volume / 100})` }"></div>
				<div class="trigger" :style="{ transform: `translateY(${-volumePosition}px)` }"></div>
			</div>
			<div class="number">{{ volume }}%</div>
		</div>
		<div class="icon"><i class="iconfont" :class="icon"></i></div>
	</div>
</template>

<script>
import { useClick } from '@/hooks/useProgress';
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
export default {
	name: 'AppSound',
	setup() {
		const store = useStore();
		const slot = ref(null); // 父元素
		const volume = computed(() => store.state.song.volume); // 音量
		const volumePosition = computed(() => {
			if (slot.value) return (volume.value / 100) * slot.value.offsetHeight;
		});
		const { y } = useClick(slot, volume);
		watch(y, newVal => store.commit('song/changVolume', newVal));
		// 字体图标
		const icon = computed(() => {
			if (volume.value === 0) {
				return 'icon-jingyin';
			} else if (volume.value <= 50) {
				return 'icon-yinliang1';
			} else if (volume.value <= 100) {
				return 'icon-yinliang2';
			}
		});
		return {
			slot,
			icon,
			volume,
			volumePosition,
		};
	},
};
</script>

<style lang="less" scoped>
.sound {
	position: absolute;
	bottom: 160%;
	left: -70%;
	width: 4rem;
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
	.volume {
		display: flex;
		align-items: center;
		flex-direction: column;
		height: 10rem;
		border-bottom: 1px solid #eee;
		.slot {
			position: relative;
			flex: 1;
			width: 0.2rem;
			background-color: #ececec;
			margin-top: 1rem;
			cursor: pointer;
			.trigger {
				position: absolute;
				bottom: -0.3rem;
				left: -0.3rem;
				width: 0.8rem;
				height: 0.8rem;
				background-color: #1fd1a7;
				border-radius: 50%;
				transition: transform 0.2s;
				cursor: pointer;
			}
			.complete {
				width: 100%;
				height: 100%;
				background-color: #1fd1a7;
				transform-origin: bottom;
				transition: transform 0.2s;
			}
		}
		.number {
			display: flex;
			align-items: center;
			height: 20%;
		}
	}
	.icon {
		display: flex;
		height: 3rem;
		justify-content: center;
		align-items: center;
	}
}
</style>
