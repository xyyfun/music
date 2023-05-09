<template>
	<canvas></canvas>
</template>

<script>
import { ref, onMounted, watch, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
export default {
	name: 'LyricsVideoVisible',
	setup() {
		const store = useStore();
		const isInit = ref(false);
		const currentMusicID = computed(() => store.state.song.currentMusicID);
		const isShowLyrics = computed(() => store.state.song.isShowLyrics);
		let audio, canvas, ctx, analyser, dataArray, requestId;
		const init = () => {
			audio = document.querySelector('audio');
			canvas = document.querySelector('canvas');
			audio.crossOrigin = 'anonymous';
			ctx = canvas.getContext('2d');
			canvas.width = window.innerWidth / 2;
			canvas.height = 80;
		};
		// 绘制
		const draw = () => {
			requestId = window.requestAnimationFrame(draw);
			if (!isInit.value) return;
			// 清空画布
			const { width, height } = canvas;
			ctx.clearRect(0, 0, width, height);
			// 让分析器节点分析出数据存储到dataArray中
			analyser.getByteFrequencyData(dataArray);
			const len = dataArray.length;
			const barWidth = width / len;
			ctx.fillStyle = '#1ecc94';
			for (let i = 0; i < len; i++) {
				const data = dataArray[i];
				const barHeight = (data / 255) * height;
				const x1 = i * barWidth + width / 2;
				const x2 = width / 2 - (i + 1) * barWidth;
				const y = height - barHeight;
				ctx.fillRect(x1, y, barWidth - 3, barHeight);
				ctx.fillRect(x2, y, barWidth - 3, barHeight);
			}
		};
		onMounted(() => {
			init(); // 初始化
			watch(
				() => store.state.song.isPlay,
				newVal => {
					if (isInit.value) return;
					if (!currentMusicID.value) return;
					const audioCtx = new AudioContext(); // 创建音频上下文
					const source = audioCtx.createMediaElementSource(audio); // 创建音频源节点
					analyser = audioCtx.createAnalyser(); // 创建分析器节点
					analyser.fftSize = 256;
					dataArray = new Uint8Array(analyser.frequencyBinCount); // 创建数组接受分析器节点的分析数据
					source.connect(analyser); // 将音频源节点连接到分析器节点
					analyser.connect(audioCtx.destination); // 将分析器节点连接到输出设备
					isInit.value = true;
				},
				{ immediate: true }
			);
		});
		watch(isShowLyrics, newVal => {
			if (!newVal) {
				window.cancelAnimationFrame(requestId);
			} else {
				draw();
			}
		});
	},
};
</script>

<style lang="less" scoped>
canvas {
	display: block;
	margin: 0 auto;
	-webkit-mask-image: linear-gradient(
		90deg,
		hsla(0, 0%, 100%, 0) 0,
		hsla(0, 0%, 100%, 0.6) 20%,
		#fff 30%,
		#fff 70%,
		hsla(0, 0%, 100%, 0.6) 80%,
		hsla(0, 0%, 100%, 0)
	);
}
</style>
