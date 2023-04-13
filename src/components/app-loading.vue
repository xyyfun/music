<template>
	<div class="app-loading">
		<div class="loading-content">
			<div class="after"></div>
			<div class="before"></div>
			<p class="msg">loading...</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppLoading',
};
</script>

<style lang="less" scoped>
.app-loading {
	width: 100%;
	height: 100%;
	.loading-content {
		position: relative;
		width: 100%;
		height: 100%;
		> div {
			position: absolute;
			left: 50%;
			top: 50%;
			border-radius: 50%;
		}
		.after {
			width: 4rem;
			height: 4rem;
			margin-left: -2rem;
			margin-top: -2rem;
			background-color: rgba(30, 204, 148, 0.5);
			animation: after 1s linear infinite alternate;
		}
		.before {
			width: 2rem;
			height: 2rem;
			margin-left: -1rem;
			margin-top: -1rem;
			background-color: #1fd2a7;
			animation: before 1s linear infinite alternate;
		}
		.msg {
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: 2rem;
			transform: translateX(-50%);
		}
		@keyframes after {
			from {
				transform: scale(1, 1);
			}
			to {
				transform: scale(0.5, 0.5);
			}
		}
		@keyframes before {
			from {
				transform: scale(0, 0);
			}
			to {
				transform: scale(1, 1);
			}
		}
	}
}
</style>
