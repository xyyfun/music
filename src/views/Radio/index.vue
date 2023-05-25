<template></template>

<script>
import { onMounted } from 'vue';
import message from '@/utils/message';
export default {
	name: 'AppRadio',
	setup() {
		onMounted(() => {
			message({ type: 'warn', message: '功能开发中，敬请期待！' });
		});
	},
};
</script>

<style></style>
