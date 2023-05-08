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
			<AppMore v-if="album.length" @loadMore="loadMore" :isMore="isMore" />
		</div>
	</div>
</template>

<script>
import AppMask from '@/components/app-mask';
import AppMore from '@/components/app-more';
import { getSingerAlbum } from '@/api/singer';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { useDateFormat } from '@vueuse/core';
export default {
	name: 'SingerAlbum',
	components: { AppMask, AppMore },
	setup() {
		const route = useRoute();
		const album = ref([]);
		const isMore = ref(true);
		const offset = ref(2);
		const loadMore = () => {
			offset.value++;
			getDataList();
		};
		const getDataList = () => {
			getSingerAlbum(route.params.id, offset.value).then(data => {
				data.data.hotAlbums.forEach(e => {
					const str = useDateFormat(e.publishTime, 'YYYY-MM-DD');
					e.publishTime = str.value;
					album.value.push(e);
				});
				isMore.value = data.data.more;
			});
		};
		watch(
			() => route.params.id,
			newVal => {
				if (newVal && route.name === 'singer') getDataList();
			},
			{ immediate: true }
		);
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
