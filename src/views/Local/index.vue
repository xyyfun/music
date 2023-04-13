<template>
	<div class="app-local scroll">
		<div class="local-content">
			<MusicTitle title="本地和下载" />
		</div>
	</div>
</template>

<script>
import MusicTitle from '@/components/library/music-title';
export default {
	name: 'AppLocal',
	components: { MusicTitle },
};
</script>

<style lang="less" scoped>
.app-local {
	flex: 1;
	overflow-y: auto;
	.local-content {
		padding: 0 1.78rem;
	}
}
</style>
