<template>
	<h1>{{ title }}</h1>
</template>

<script>
export default {
	name: 'MusicTitle',
	props: {
		title: {
			type: String,
			default: '',
		},
	},
};
</script>

<style scoped>
h1 {
	font-size: 2rem;
	padding: 1.5rem 0;
}
</style>
