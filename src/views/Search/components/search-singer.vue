<template>
	<div class="singer">
		<div class="item" v-for="item in lists" :key="item.id">
			<router-link :to="`/singer/${item.id}`">
				<img v-lazy="item.picUrl + '?param=130y130'" alt="" />
				<span>{{ item.name }}</span>
			</router-link>
		</div>
	</div>
	<MusicPagination
		:pageNo="pageNo"
		:pageSize="pageSize"
		:totalPages="totalPages"
		:continues="5"
		@changePage="changePage" />
</template>

<script>
import MusicPagination from '@/components/library/music-pagination';
import { search } from '@/api/search';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
export default {
	name: 'SearchSinger',
	components: { MusicPagination },
	emits: ['viewsTop'],
	setup(props, { emit }) {
		const route = useRoute();
		const pageNo = ref(1);
		const pageSize = ref(30);
		const totalPages = ref(null);
		const lists = ref([]);
		const changePage = num => (pageNo.value = num);
		watch(
			[() => route.params.keyword, pageNo],
			([keyword, pageNo]) => {
				search(keyword, pageSize.value, 100, pageNo).then(data => {
					lists.value = data.data.result.artists;
					totalPages.value = Math.floor(data.data.result.artistCount / 30);
				});
			},
			{ immediate: true }
		);
		return {
			lists,
			pageNo,
			pageSize,
			totalPages,
			changePage,
		};
	},
};
</script>

<style lang="less" scoped>
.singer {
	display: grid;
	gap: 1.25rem;
	.item {
		a {
			display: flex;
			flex-direction: column;
			align-items: center;
			img {
				border-radius: 50%;
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
// 屏幕大于 1024px
@media screen and (max-width: 1024px) {
	.singer {
		grid-template-columns: repeat(6, 1fr);
	}
}
@media screen and (min-width: 1024px) {
	.singer {
		grid-template-columns: repeat(8, 1fr);
	}
}
@media screen and (min-width: 1280px) {
	.singer {
		grid-template-columns: repeat(10, 1fr);
	}
}
</style>
