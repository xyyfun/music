<template>
	<div class="singer">
		<div class="item" v-for="item in lists" :key="item.id">
			<router-link :to="`/singer/${item.id}`">
				<img v-lazy="item.picUrl + '?param=130y130'" alt="" />
				<span>{{ item.name }}</span>
			</router-link>
		</div>
	</div>
	<AppMore v-if="lists.length" @loadMore="loadMore" :isMore="isMore" />
</template>

<script>
import AppMore from '@/components/app-more';
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import useSearch from '@/hooks/useSearch';
export default {
	name: 'SearchSinger',
	components: { AppMore },
	setup() {
		const route = useRoute();
		const lists = ref([]);
		const offset = ref(1);
		const isMore = ref(true);
		const loadMore = () => {
			offset.value++;
			getData();
		};
		const clearData = () => {
			lists.value = [];
			offset.value = 1;
			isMore.value = true;
		};
		const getData = () => {
			const keyword = route.params.keyword;
			useSearch(keyword, 'artists', offset.value, (val, artistCount) => {
				if (!artistCount) isMore.value = false;
				val.forEach(e => lists.value.push(e));
			});
		};
		onMounted(() => {
			watch(
				() => route.params.keyword,
				(new_keyword, old_keyword) => {
					if (old_keyword !== new_keyword) clearData();
					getData();
				},
				{ immediate: true }
			);
		});
		return {
			lists,
			loadMore,
			isMore,
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
