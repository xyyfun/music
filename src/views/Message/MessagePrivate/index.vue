<template>
	<div class="private overflow">
		<PrivateList />
		<PrivateContent />
	</div>
</template>

<script>
import PrivateList from './components/private-list';
import PrivateContent from './components/private-content';
export default {
	name: 'MessagePrivate',
	components: { PrivateList, PrivateContent },
};
</script>

<style lang="less" scoped>
.private {
	flex: 1;
	display: flex;
}
</style>
