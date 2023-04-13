<template>
	<div class="app-album scroll">
		<div class="album-content">
			<MusicPlaylistDescription :detail="detail" @addList="addPlaylist" />
			<MusicTabs :tabs="tabs" :isRouter="false" @handlerBac="handlerBac" />
			<MusicPlaylistList
				v-if="now === 1"
				:lists="songs"
				:isShowSinger="true"
				:isShowAlbum="false" />
			<MusicComment v-if="now === 2" :comments="comments" :hotComments="hotComments" />
			<AppMore v-if="now === 2" @loadMore="loadMore" :isMore="isMore" />
		</div>
	</div>
</template>

<script>
import MusicPlaylistDescription from '@/components/library/music-playlist-description';
import MusicTabs from '@/components/library/music-tabs';
import MusicPlaylistList from '@/components/library/music-playlist-list';
import MusicComment from '@/components/library/music-comment';
import AppMore from '@/components/app-more';
import { useDateFormat } from '@vueuse/core';
import { ref, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { getAlbumData, getAlbumComment } from '@/api/album';
export default {
	name: 'AppAlbum',
	components: { MusicPlaylistDescription, MusicTabs, MusicPlaylistList, MusicComment, AppMore },
	setup() {
		const route = useRoute();
		const store = useStore();
		const songs = shallowRef([]);
		const detail = shallowRef({});
		const comments = shallowRef([]);
		const hotComments = shallowRef([]);
		const isMore = ref(true);
		const now = ref(1);
		const num = ref(30);
		const tabs = [
			{ title: '歌曲', id: 1 },
			{ title: '评论', id: 2 },
		];
		const handlerBac = id => {
			now.value = id;
		};
		const loadMore = () => {
			num.value += 30;
			getCommentData();
		};
		// 全部播放
		const addPlaylist = () => {
			const id = songs.value[0].id;
			store.commit('song/ISPLAY', false);
			store.dispatch('song/getMusic', id);
			store.commit('song/addList', songs.value);
		};
		getAlbumData(route.params.id).then(data => {
			data.data.songs.forEach(e => {
				const str = useDateFormat(e.dt, 'mm:ss');
				e.dt = str.value.replace(/\"/g, '');
			});
			const {
				description,
				artist: { picUrl: avatarUrl, name: nickname },
				name,
				picUrl,
				publishTime,
			} = data.data.album;
			detail.value = {
				description,
				nickname,
				avatarUrl,
				name,
				picUrl,
				updateTime: publishTime,
			};
			songs.value = data.data.songs;
		});
		// 获取专辑评论
		const getCommentData = () => {
			getAlbumComment(route.params.id, num.value).then(data => {
				comments.value = data.data.comments;
				hotComments.value = data.data.hotComments;
				isMore.value = data.data.more;
			});
		};
		getCommentData();
		return {
			route,
			tabs,
			detail,
			songs,
			now,
			loadMore,
			comments,
			hotComments,
			isMore,
			addPlaylist,
			handlerBac,
		};
	},
};
</script>

<style lang="less" scoped>
.app-album {
	flex: 1;
	overflow-y: auto;
	.album-content {
		padding: 0 1.78rem;
	}
}
</style>
