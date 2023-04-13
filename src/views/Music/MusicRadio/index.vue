<template>
	<div class="radio">
		<RadioBanner />
		<RadioHot />
		<RadioProgram />
		<RadioPersonality />
		<RadioAnchor />
	</div>
</template>

<script>
import RadioBanner from './components/radio-banner';
import RadioHot from './components/radio-hot';
import RadioProgram from './components/radio-program';
import RadioPersonality from './components/radio-personality';
import RadioAnchor from './components/radio-anchor';
export default {
	name: 'MusicRadio',
	components: { RadioBanner, RadioHot, RadioProgram, RadioPersonality, RadioAnchor },
};
</script>
