<template>
	<div class="app-message overflow">
		<div class="message-content">
			<MusicTitleChild title="私信通知" />
			<MusicTabs :tabs="tabs" :isRouter="true" />
			<router-view v-slot="{ Component }">
				<transition name="message">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicTabs from '@/components/library/music-tabs';
export default {
	name: 'UserMessage',
	components: { MusicTitleChild, MusicTabs },
	setup() {
		const tabs = [
			{ title: '私信', hash: '/message/private' },
			{ title: '评论', hash: '/message/comment' },
			{ title: '@我', hash: '/message/at' },
			{ title: '通知', hash: '/message/system' },
		];
		return { tabs };
	},
};
</script>

<style lang="less" scoped>
.app-message {
	flex: 1;
	.message-content {
		padding-left: 1.78rem;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
}
/* 进入的起点,离开的终点 */
.message-enter-from,
.message-leave-to {
	opacity: 0;
}
/* 进入进行时,离开进行时 */
.message-enter-active {
	transition: all 0.5s;
}

/* 进入的终点,离开的起点 */
.message-enter-to,
.message-leave {
	opacity: 1;
}
</style>
