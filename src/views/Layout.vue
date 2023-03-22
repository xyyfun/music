<template>
	<div class="container overflow">
		<AppSidebar />
		<div class="main-container">
			<AppHeader />
			<router-view></router-view>
			<AppProgress />
		</div>
	</div>
</template>

<script>
import AppSidebar from '@/components/app-sidebar';
import AppHeader from '@/components/app-header';
import AppProgress from '@/components/app-progress';
export default {
	name: 'Layout',
	components: { AppSidebar, AppHeader, AppProgress },
};
</script>

<style lang="less">
.container {
	display: flex;
	width: 100vw;
	height: 100vh;
	.main-container {
		flex: 1;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}
}
</style>
