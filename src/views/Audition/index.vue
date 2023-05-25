<template>
	<div class="app-audition scroll">
		<div class="audition-content">
			<MusicTitle title="试听列表" />
		</div>
	</div>
</template>

<script>
import MusicTitle from '@/components/library/music-title';
import { onMounted } from 'vue';
import message from '@/utils/message';
export default {
	name: 'AppAudition',
	components: { MusicTitle },
	setup() {
		onMounted(() => {
			message({ type: 'warn', message: '功能开发中，敬请期待！' });
		});
	},
};
</script>

<style lang="less" scoped>
.app-audition {
	flex: 1;
	overflow-y: auto;
	.audition-content {
		padding: 0 1.78rem;
	}
}
</style>
