<template>
	<div class="picked">
		<AppBanner />
		<PickedEllipsis />
		<PickedRadar />
		<PickedProgram />
	</div>
</template>

<script>
import AppBanner from '@/components/app-banner';
import PickedEllipsis from './components/picked-exclusive';
import PickedRadar from './components/picked-radar';
import PickedProgram from './components/picked-program';
export default {
	name: 'MusicPicked',
	components: { AppBanner, PickedEllipsis, PickedRadar, PickedProgram },
};
</script>
