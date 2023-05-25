<template>
	<div class="comment overflow">
		<MessageNotice :messageType="0" />
	</div>
</template>

<script>
import MessageNotice from '../components/message-notice';
export default {
	name: 'MessageComment',
	components: { MessageNotice },
};
</script>

<style lang="less" scoped>
.comment {
	flex: 1;
}
</style>
