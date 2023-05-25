<template>
	<div class="at overflow">
		<MessageNotice :messageType="1" />
	</div>
</template>

<script>
import MessageNotice from '../components/message-notice';
export default {
	name: 'MessageAt',
	components: { MessageNotice },
};
</script>

<style lang="less" scoped>
.at {
	flex: 1;
}
</style>
