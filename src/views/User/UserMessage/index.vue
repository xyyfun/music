<template>
	<div class="user-message">
		<div class="message-bac">
			<MusicTitleChild title="私信通知" />
			<MusicTabs :tabs="tabs" @handlerBac="handlerBac" />
			<MessageList />
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicTabs from '@/components/library/music-tabs';
import MessageList from './components/message-list';
import { ref } from 'vue';
export default {
	name: 'UserMessage',
	components: { MusicTitleChild, MusicTabs, MessageList },
	setup() {
		const now = ref(1);
		const tabs = [
			{ title: '私信', id: 1 },
			{ title: '评论', id: 2 },
			{ title: '@我', id: 3 },
			{ title: '通知', id: 4 },
		];
		const handlerBac = id => (now.value = id);
		return { now, tabs, handlerBac };
	},
};
</script>

<style lang="less" scoped>
.user-message {
}
</style>
