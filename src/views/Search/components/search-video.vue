<template>
	<div class="video">
		<div class="item" v-for="item in lists" ::key="item.vid">
			<a href="">
				<img v-lazy="item.coverUrl + '?param=280y160'" alt="" />
				<AppMask />
			</a>
			<p>{{ item.title }}</p>
			<span>
				来自
				<router-link :to="`/singer/${val.userId}`" v-for="val in item.creator" :key="val.userId">
					{{ val.userName }}
				</router-link>
			</span>
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
import AppMask from '@/components/app-mask';
import { search } from '@/api/search';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
export default {
	name: 'SearchVideo',
	components: { MusicPagination, AppMask },
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
				search(keyword, pageSize.value, 1014, pageNo).then(data => {
					lists.value = data.data.result.videos;
					totalPages.value = Math.floor(data.data.result.videoCount / 30);
					emit('viewsTop');
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
.video {
	display: grid;
	gap: 1.25rem;
	.item {
		> a {
			overflow: hidden;
			display: block;
			position: relative;
			border-radius: 0.5rem;
			img {
				transition: all 0.3s;
				object-fit: cover;
				max-height: 160px;
			}
			&:hover > img {
				transform: scale(1.1);
			}
		}
		p,
		span {
			font-size: 0.8rem;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			a {
				color: #7b7b7b;
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
// 屏幕大于 1024px
@media screen and (max-width: 1024px) {
	.video {
		grid-template-columns: repeat(3, 1fr);
	}
}
@media screen and (min-width: 1024px) {
	.video {
		grid-template-columns: repeat(4, 1fr);
	}
}
@media screen and (min-width: 1280px) {
	.video {
		grid-template-columns: repeat(5, 1fr);
	}
}
</style>
