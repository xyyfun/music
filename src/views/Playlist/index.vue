<template>
	<div class="app-playlist scroll">
		<div class="playlist-content">
			<MusicPlaylistDescription :detail="detail" @addList="addPlaylist" />
			<MusicTabs :tabs="tabs" :isRouter="false" @handlerBac="handlerBac" />
			<MusicPlaylistList v-if="now === 1" :lists="lists" :isShowSinger="true" :isShowAlbum="true" />
			<MusicComment v-if="now === 2" :comments="comments" />
		</div>
	</div>
</template>

<script>
import MusicPlaylistDescription from '@/components/library/music-playlist-description';
import MusicTabs from '@/components/library/music-tabs';
import MusicPlaylistList from '@/components/library/music-playlist-list';
import MusicComment from '@/components/library/music-comment';
import { getPlaylistDetail, getPlaylistComment } from '@/api/playlist';
import { ref, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useDateFormat } from '@vueuse/core';
export default {
	name: 'AppPlaylist',
	components: { MusicPlaylistDescription, MusicTabs, MusicPlaylistList, MusicComment },
	setup() {
		const playlist = shallowRef({});
		const detail = shallowRef({});
		const lists = shallowRef([]);
		const route = useRoute();
		const store = useStore();
		const comments = ref([]);
		const offset = ref(30);
		const now = ref(1);
		const tabs = [
			{ title: '歌曲', id: 1 },
			{ title: '评论', id: 2 },
		];
		watch(playlist, newVal => {
			const {
				description,
				creator: { nickname, avatarUrl },
				name,
				coverImgUrl: picUrl,
				updateTime,
				subscribedCount,
				shareCount,
			} = newVal;
			detail.value = {
				description,
				nickname,
				avatarUrl,
				name,
				picUrl,
				updateTime,
				subscribedCount,
				shareCount,
			};
			newVal.tracks.forEach(e => {
				const str = useDateFormat(e.dt, 'mm:ss');
				e.dt = str.value.replace(/\"/g, '');
			});
			lists.value = newVal.tracks;
		});
		const handlerBac = id => {
			now.value = id;
		};
		// 全部播放
		const addPlaylist = () => {
			const id = lists.value[0].id;
			store.commit('song/ISPLAY', false);
			store.dispatch('song/getMusic', id);
			store.commit('song/addList', lists.value);
		};
		getPlaylistComment(route.params.id, offset.value).then(data => {
			comments.value = data.data.comments;
		});
		getPlaylistDetail(route.params.id).then(data => {
			data.data.playlist.tracks.forEach((e, i) => {
				e.privilege = data.data.privileges[i];
			});
			playlist.value = data.data.playlist;
		});
		return { now, tabs, handlerBac, playlist, detail, lists, addPlaylist, comments };
	},
};
</script>

<style lang="less" scoped>
.app-playlist {
	flex: 1;
	overflow-y: auto;
	.playlist-content {
		padding: 0 1.78rem;
	}
}
</style>
