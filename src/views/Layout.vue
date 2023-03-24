<template>
	<div class="container overflow">
		<AppSidebar />
		<div class="main-container">
			<AppHeader />
			<router-view v-slot="{ Component }">
				<transition name="fade" appear>
					<component :is="Component" />
				</transition>
			</router-view>
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
		flex-direction: column;
		justify-content: space-between;
		min-width: 43rem;
		max-width: 1536px;
		margin: 0 auto;
	}
}

/* 进入的起点,离开的终点 */
.fade-enter-from,
.fade-leave-to {
	transform: translateX(1rem);
	opacity: 0;
}
/* 进入进行时,离开进行时 */
.fade-enter-active {
	transition: all 0.5s;
}

/* 进入的终点,离开的起点 */
.fade-enter-to,
.fade-leave {
	transform: translateX(0px);
	opacity: 1;
}
</style>
