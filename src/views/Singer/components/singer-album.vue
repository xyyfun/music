<template>
	<div class="singer-album">
		<div class="album">
			<div class="lists">
				<div class="list" v-for="item in album" :key="item.id">
					<router-link :to="`/album/${item.id}`">
						<img v-lazy="item.blurPicUrl + '?param=200y200'" alt="" />
						<AppMask />
					</router-link>
					<span class="name ellipsis">{{ item.name }}</span>
					<span class="time">{{ item.publishTime }}</span>
				</div>
			</div>
			<AppMore @loadMore="loadMore" :isMore="isMore" />
		</div>
	</div>
</template>

<script>
import AppMask from '@/components/app-mask';
import AppMore from '@/components/app-more';
import { getSingerAlbum } from '@/api/singer';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useDateFormat } from '@vueuse/core';
export default {
	name: 'SingerAlbum',
	components: { AppMask, AppMore },
	setup() {
		const route = useRoute();
		const album = ref([]);
		const isMore = ref(true);
		const num = ref(30);
		const loadMore = () => {
			num.value += 30;
			getDataList();
		};
		const getDataList = () => {
			getSingerAlbum(route.params.id, num.value).then(data => {
				data.data.hotAlbums.forEach(e => {
					const str = useDateFormat(e.publishTime, 'YYYY-MM-DD');
					e.publishTime = str.value;
				});
				album.value = data.data.hotAlbums;
				isMore.value = data.data.more;
			});
		};
		getDataList();
		return {
			album,
			isMore,
			loadMore,
		};
	},
};
</script>

<style lang="less" scoped>
.singer-album {
	padding: 0 1.78rem;
	.album {
		.lists {
			display: grid;
			gap: 1.25rem;
			grid-template-columns: repeat(8, 10rem);
			.list {
				display: flex;
				flex-direction: column;
				a {
					position: relative;
					transition: all 0.3s;
					&:hover {
						transform: translateY(-0.3rem);
					}
					img {
						width: 10rem;
						height: 10rem;
						object-fit: cover;
						border-radius: 0.5rem;
					}
				}
				span {
					font-size: 0.85rem;
				}
			}
		}
	}
}
</style>
