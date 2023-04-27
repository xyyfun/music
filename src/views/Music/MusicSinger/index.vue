<template>
	<div class="singer">
		<SingerFilters @handlerParams="handlerParams" />
		<SingerList :singerDataList="singerDataList" />
		<AppMore @loadMore="loadMore" :isMore="isMore" />
	</div>
</template>

<script>
import SingerFilters from './components/singer-filters';
import SingerList from './components/singer-list';
import AppMore from '@/components/app-more';
import { getSinger } from '@/api/singer';
import { ref, watch } from 'vue';
export default {
	name: 'MusicSinger',
	components: { SingerFilters, SingerList, AppMore },
	setup() {
		const singerDataList = ref([]);
		const isMore = ref(true); // 是否拥有更多
		const params = ref({
			type: -1,
			area: -1,
			initial: -1,
			offset: 1,
		});
		const handlerParams = (item, val) => {
			params.value[item] = val;
		};
		//
		const loadMore = () => {
			params.value.offset++;
		};
		// 初始化数据
		watch(
			[() => params.value.type, () => params.value.area, () => params.value.initial],
			() => {
				getSinger({ ...params.value }).then(data => {
					singerDataList.value = data.data.artists;
					isMore.value = data.data.more;
				});
			},
			{ immediate: true }
		);
		// 返回的数据固定60条，需要往数组上push呈现出更多数据
		watch(
			() => params.value.offset,
			() => {
				getSinger({ ...params.value }).then(data => {
					data.data.artists.forEach(e => {
						singerDataList.value.push(e);
					});
					isMore.value = data.data.more;
				});
			}
		);
		return { params, singerDataList, handlerParams, loadMore, isMore };
	},
};
</script>
