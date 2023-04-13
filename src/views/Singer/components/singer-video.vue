<template>
	<div class="singer-video">
		<div class="video">
			<div class="lists">
				<div class="list" v-for="item in lists" :key="item.id">
					<a href="">
						<img :src="item.imgurl16v9 + '?param=460y244'" alt="" />
						<AppMask />
					</a>
					<span>{{ item.name }}</span>
				</div>
			</div>
			<AppMore @loadMore="loadMore" :isMore="isMore" />
		</div>
	</div>
</template>

<script>
import AppMask from '@/components/app-mask';
import AppMore from '@/components/app-more';
import { getSingerMV } from '@/api/singer';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
export default {
	name: 'SingerVideo',
	components: { AppMask, AppMore },
	setup() {
		const route = useRoute();
		const lists = ref([]);
		const isMore = ref(true);
		const num = ref(30);
		const loadMore = () => {
			num.value += 30;
			getDataList();
		};
		const getDataList = () => {
			getSingerMV(route.params.id, num.value).then(data => {
				lists.value = data.data.mvs;
				isMore.value = data.data.hasMore;
			});
		};
		getDataList();
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
