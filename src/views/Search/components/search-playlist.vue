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
	<MusicPagination
		:pageNo="pageNo"
		:pageSize="pageSize"
		:totalPages="totalPages"
		:continues="5"
		@changePage="changePage" />
</template>

<script>
import MusicPagination from '@/components/library/music-pagination';
import useNumberSwitch from '@/hooks/useNumberSwitch';
import { search } from '@/api/search';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
export default {
	name: 'SearchPlaylist',
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
				search(keyword, pageSize.value, 1000, pageNo).then(data => {
					data.data.result.playlists.forEach(e => {
						e.playCount = useNumberSwitch(e.playCount);
					});
					lists.value = data.data.result.playlists;
					totalPages.value = Math.floor(data.data.result.playlistCount / 30);
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
			background-color: #efefef;
		}
	}
}
</style>
