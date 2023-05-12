<template>
	<div class="app-user scroll">
		<div class="user-content">
			<router-view v-slot="{ Component }">
				<transition name="fade">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppUser',
};
</script>

<style lang="less">
.app-user {
	flex: 1;
	overflow-y: auto;
	.user-content {
		padding: 0 1.78rem;
	}
}
</style>
