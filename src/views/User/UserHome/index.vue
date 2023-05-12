<template>
	<div class="user-home">
		<UserDescription />
		<MusicTabs :tabs="tabs" @handlerBac="handlerBac" />
		<UserLike v-if="now === 1" />
		<UserPlaylist v-if="now === 2" />
	</div>
</template>

<script>
import UserDescription from './components/user-description';
import MusicTabs from '@/components/library/music-tabs';
import UserLike from './components/user-like';
import UserPlaylist from './components/user-playlist';
import { ref } from 'vue';
export default {
	name: 'UserHome',
	components: { UserDescription, MusicTabs, UserLike, UserPlaylist },
	setup() {
		const now = ref(1);
		const tabs = [
			{ title: '喜欢', id: 1 },
			{ title: '创建的歌单', id: 2 },
		];
		const handlerBac = id => (now.value = id);
		return { now, tabs, handlerBac };
	},
};
</script>
