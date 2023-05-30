<template>
	<div class="video">
		<div class="video-list">
			<div class="item" v-for="item in lists" :key="item.vid">
				<router-link :to="`/player?vid=${item.vid}&type=${item.type ? 'video' : 'mv'}`">
					<img v-lazy="item.coverUrl + '?param=268y146'" alt="" />
					<AppMask />
				</router-link>
				<span>{{ item.title }}</span>
				<span>
					<router-link
						:to="`${item.type ? `/user?id=${val.userId}` : `/singer/${val.userId}`}`"
						v-for="val in item.creator"
						:key="val.userId">
						{{ val.userName }}
					</router-link>
				</span>
			</div>
		</div>
	</div>
	<AppMore @loadMore="loadMore" :isMore="isMore" />
</template>

<script>
import AppMask from '@/components/app-mask';
import AppMore from '@/components/app-more';
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import useSearch from '@/hooks/useSearch';
export default {
	name: 'SearchVideo',
	components: { AppMask, AppMore },
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
			useSearch(keyword, 'videos', 1, (val, videoCount) => {
				if (!videoCount) isMore.value = false;
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
			isMore,
			loadMore,
		};
	},
};
</script>

<style lang="less" scoped>
.video {
	.video-list {
		display: grid;
		gap: 1.25rem;
		.item {
			display: flex;
			flex-direction: column;
			> a {
				overflow: hidden;
				position: relative;
				border-radius: 0.5rem;
				background-color: var(--global-bg6);
				img {
					width: 100%;
					height: 100%;
					max-height: 146px;
					object-fit: contain;
					object-position: center center;
					transition: all 0.4s;
				}
				&:hover > img {
					transform: scale(1.1);
				}
			}
			span {
				font-size: 0.8rem;
				margin-top: 0.5rem;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				&:last-child {
					color: var(--text-default2-a-color);
				}
				a {
					&::after {
						content: ' / ';
					}
					&:last-child {
						&::after {
							display: none;
						}
					}
				}
			}
		}
	}
}
// 屏幕大于 1024px
@media screen and (max-width: 1024px) {
	.video-list {
		grid-template-columns: repeat(3, 1fr);
	}
}
@media screen and (min-width: 1024px) {
	.video-list {
		grid-template-columns: repeat(4, 1fr);
	}
}
@media screen and (min-width: 1280px) {
	.video-list {
		grid-template-columns: repeat(5, 1fr);
	}
}
</style>
