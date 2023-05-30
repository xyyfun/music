<template>
	<div class="album">
		<div class="item" v-for="item in lists" :key="item.id">
			<router-link :to="`/album/${item.id}`">
				<div class="msg ellipsis">
					<img v-lazy="item.picUrl + '?param=130y130'" alt="" />
					<span>{{ item.name }}</span>
				</div>
				<span class="ellipsis">
					<router-link :to="`/singer/${val.id}`" v-for="val in item.artists" :key="val.id">
						{{ val.name }}
					</router-link>
				</span>
				<span class="ellipsis">{{ item.publishTime }}</span>
				<span>{{ item.onSale ? '在售' : '未在售' }}</span>
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
	name: 'SearchAlbum',
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
			offset.value = 1;
			isMore.value = true;
			lists.value = [];
		};
		const getData = () => {
			const keyword = route.params.keyword;
			if (!keyword) return;
			useSearch(keyword, 'albums', offset.value, (val, albumCount) => {
				if (!albumCount) isMore.value = false;
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
.album {
	display: grid;
	gap: 1.25rem;
	grid-template-columns: repeat(1, minmax(0, 1fr));
	.item {
		border-radius: 0.5rem;
		transition: all 0.3s;
		span {
			font-size: 0.8rem;
			&:last-child {
				margin-right: 1rem;
			}
		}
		> a {
			display: block;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.msg {
				width: 25rem;
				img {
					height: 5rem;
					border-radius: 0.3rem;
				}
				span {
					margin-left: 1rem;
				}
			}
			span {
				flex: 1;
				&:nth-of-type(n + 2) {
					text-align: center;
				}
			}
		}
		&:hover {
			background-color: var(--global-hover2-bg);
		}
	}
}
</style>
