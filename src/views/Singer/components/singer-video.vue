<template>
	<div class="singer-video">
		<MusicMvList :lists="lists" :isShowSinger="false" />
		<AppMore v-if="lists.length" @loadMore="loadMore" :isMore="isMore" />
	</div>
</template>

<script>
import AppMore from '@/components/app-more';
import MusicMvList from '@/components/library/music-mv-list';
import { getSingerMV } from '@/api/singer';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
export default {
	name: 'SingerVideo',
	components: { MusicMvList, AppMore },
	setup() {
		const route = useRoute();
		const lists = ref([]);
		const isMore = ref(true);
		const offset = ref(1);
		const loadMore = () => {
			offset.value++;
			getDataList();
		};
		const getDataList = () => {
			getSingerMV(route.params.id, offset.value).then(data => {
				data.data.mvs.forEach(e => {
					e.cover = e.imgurl;
					delete e.imgurl;
					lists.value.push(e);
				});
				isMore.value = data.data.hasMore;
			});
		};
		watch(
			() => route.params.id,
			newVal => {
				lists.value = [];
				if (newVal) getDataList();
			},
			{ immediate: true }
		);
		return {
			lists,
			loadMore,
			isMore,
		};
	},
};
</script>

<style lang="less" scoped>
.singer-video {
	padding: 0 1.78rem;
	.video {
		.lists {
			display: grid;
			gap: 1.25rem;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			.list {
				display: flex;
				flex-direction: column;
				a {
					overflow: hidden;
					position: relative;
					border-radius: 0.5rem;
					&:hover > img {
						transform: scale(1.1);
					}
					img {
						width: 100%;
						max-height: 244px;
						transition: all 0.3s;
					}
				}
				span {
					font-size: 0.8rem;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
}
</style>
