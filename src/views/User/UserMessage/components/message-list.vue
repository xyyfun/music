<template></template>

<script>
import { getPrivateMessage } from '@/api/user';
import { onMounted } from 'vue';
export default {
	name: 'MessageList',
	setup(props) {
		onMounted(() =>
			getPrivateMessage(1).then(data => {
				console.log(data);
			})
		);
	},
};
</script>

<style></style>
