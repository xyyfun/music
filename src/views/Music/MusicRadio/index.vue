<template>
	<div class="radio">
		<RadioBanner />
		<RadioHot />
		<RadioProgram />
		<RadioAnchor />
	</div>
</template>

<script>
import RadioBanner from './components/radio-banner';
import RadioHot from './components/radio-hot';
import RadioProgram from './components/radio-program';
import RadioAnchor from './components/radio-anchor';
export default {
	name: 'MusicRadio',
	components: { RadioBanner, RadioHot, RadioProgram, RadioAnchor },
};
</script>
