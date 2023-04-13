<template>
	<div class="app-audition scroll">
		<div class="audition-content">
			<MusicTitle title="试听列表" />
		</div>
	</div>
</template>

<script>
import MusicTitle from '@/components/library/music-title';
export default {
	name: 'AppAudition',
	components: { MusicTitle },
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
