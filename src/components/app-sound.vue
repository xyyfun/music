<template>
	<div class="sound" v-show="isShowVolume" ref="sound">
		<div class="volume">
			<div class="slot" ref="father">
				<div class="complete" :style="{ height: y + '%' }"></div>
				<div class="trigger" :style="{ bottom: y + '%' }" ref="trigger"></div>
			</div>
			<div class="number">{{ y }}%</div>
		</div>
		<div class="icon"><i class="iconfont" :class="icon"></i></div>
	</div>
</template>

<script>
import mouseDownMove from '@/utils/mouseDownMove';
import { onClickOutside } from '@vueuse/core';
import { ref, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
export default {
	name: 'AppSound',
	setup() {
		const store = useStore();
		const isShowVolume = ref(false);
		const trigger = ref(null);
		const father = ref(null);
		const sound = ref(null);
		const volume = computed(() => store.state.song.volume);
		const y = computed(() => store.state.song.volume);
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
		onClickOutside(sound, () => (isShowVolume.value = false));
		onMounted(() => {
			watch(
				isShowVolume,
				newVal => {
					if (newVal) {
						mouseDownMove(trigger.value, volume, father.value, value => {
							store.commit('song/changVolume', value);
						});
					}
				},
				{ immediate: true }
			);
		});
		return {
			isShowVolume,
			father,
			sound,
			trigger,
			y,
			icon,
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
	z-index: 2;
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
			margin-top: 0.7rem;
			.trigger {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translate(-50%, 50%);
				width: 0.8rem;
				height: 0.8rem;
				background-color: #1fd1a7;
				border-radius: 50%;
				cursor: pointer;
			}
			.complete {
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 20px;
				background-color: #1fd1a7;
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
