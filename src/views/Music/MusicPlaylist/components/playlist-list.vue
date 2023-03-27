<template>
	<div class="playlist-list">
		<div class="list">
			<MusicTitleChild :title="title" />
			<MusicList :dataList="playlists" />
			<AppMore @loadMore="loadMore" :isMore="isMore" />
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicList from '@/components/library/music-list';
import AppMore from '@/components/app-more';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { getPlaylist } from '@/api/music';
import emitter from '@/utils/bus';
export default {
	name: 'PlaylistList',
	components: { MusicTitleChild, MusicList, AppMore },
	setup() {
		const playlists = ref([]);
		const title = ref('全部歌单');
		const lasttime = ref(0);
		const isMore = ref(true);
		const params = ref({
			before: 0,
			cat: title.value,
		});
		const loadMore = () => {
			params.value.before = lasttime.value;
		};
		watch(
			() => params.value.cat,
			() => {
				getPlaylist({ ...params.value }).then(data => {
					data.data.playlists.forEach(e => {
						e.picUrl = e.coverImgUrl;
						delete e.coverImgUrl;
					});
					playlists.value = data.data.playlists;
					lasttime.value = data.data.lasttime;
					isMore.value = data.data.more;
				});
			},
			{ immediate: true }
		);
		watch(
			() => params.value.before,
			() => {
				getPlaylist({ ...params.value }).then(data => {
					data.data.playlists.forEach(e => {
						e.picUrl = e.coverImgUrl;
						delete e.coverImgUrl;
					});
					data.data.playlists.forEach(e => {
						playlists.value.push(e);
					});
					lasttime.value = data.data.lasttime;
					isMore.value = data.data.more;
				});
			}
		);
		onMounted(() => {
			emitter.on('changTitle', val => {
				title.value = val + '歌单';
				params.value.cat = val;
			});
		});
		onUnmounted(() => {
			emitter.all.clear();
		});
		return { title, params, playlists, loadMore, isMore };
	},
};
</script>

<style lang="less" scoped></style>
