<template>
	<div class="mv-lists">
		<div class="lists">
			<MvNew />
			<MvOfficial />
			<MvRanking />
		</div>
	</div>
</template>

<script>
import MvNew from './components/mv-new';
import MvOfficial from './components/mv-official';
import MvRanking from './components/mv-ranking';
export default {
	name: 'MvList',
	components: { MvNew, MvOfficial, MvRanking },
};
</script>

<style></style>
