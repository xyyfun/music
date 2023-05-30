<template>
	<div class="playlist">
		<div class="item" v-for="item in lists" :key="item.id">
			<router-link :to="`/playlist/${item.id}`">
				<div class="msg ellipsis">
					<img v-lazy="item.coverImgUrl + '?param=130y130'" alt="" />
					<span>{{ item.name }}</span>
				</div>
				<span class="ellipsis">
					<router-link :to="`/singer/${item.creator.userId}`">
						{{ item.creator.nickname }}
					</router-link>
				</span>
				<span class="ellipsis">{{ item.playCount }}人播放</span>
				<span>{{ item.trackCount }}首</span>
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
	name: 'SearchPlaylist',
	components: { AppMore },
	setup() {
		const route = useRoute();
		const offset = ref(1);
		const lists = ref([]);
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
			if (!keyword) return;
			useSearch(keyword, 'playlists', offset.value, (val, playCount) => {
				if (!playCount) isMore.value = false;
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
.playlist {
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
