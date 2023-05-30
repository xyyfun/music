<template>
	<div class="album-all-list">
		<div class="all-list">
			<div class="head">
				<MusicTitleChild title="全部专辑" />
				<ul>
					<li
						v-for="item in title"
						:key="item.id"
						:class="{ active: now === item.id }"
						@click="changTitle(item)">
						<a href="javascript:;">{{ item.name }}</a>
					</li>
				</ul>
			</div>
			<MusicList :dataList="album" params="/album" />
			<AppMore v-if="album.length" @loadMore="loadMore" :isMore="isMore" />
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicList from '@/components/library/music-list';
import AppMore from '@/components/app-more';
import { getTopAlbum } from '@/api/album';
import { onMounted, ref } from 'vue';
export default {
	name: 'AlbumAllList',
	components: { MusicTitleChild, MusicList, AppMore },
	setup() {
		const album = ref([]);
		const now = ref(1);
		const offset = ref(1);
		const isMore = ref(true);
		const area = ref('ALL');
		const title = [
			{ id: 1, name: '全部', area: 'ALL' },
			{ id: 2, name: '华语', area: 'ZH' },
			{ id: 3, name: '韩国', area: 'KR' },
			{ id: 4, name: '欧美', area: 'EA' },
			{ id: 5, name: '日本', area: 'JP' },
		];
		const changTitle = item => {
			album.value = [];
			offset.value = 1;
			isMore.value = true;
			now.value = item.id;
			area.value = item.area;
			getData();
		};
		const loadMore = () => {
			offset.value++;
			getData();
		};
		// 数据获取
		const getData = () => {
			if (isMore.value) {
				getTopAlbum(area.value, offset.value).then(data => {
					if (offset.value * 50 >= data.data.total) isMore.value = false;
					const arr = [];
					data.data.albums.forEach(e => arr.push(e));
					album.value.push(...arr);
				});
			}
		};
		onMounted(() => {
			getData();
		});
		return { album, now, title, loadMore, isMore, changTitle };
	},
};
</script>

<style scoped lang="less">
.all-list {
	.head {
		display: flex;
		justify-content: space-between;
		ul {
			display: flex;
			align-items: center;
			li {
				margin-left: 1rem;
				height: 2rem;
				line-height: 2rem;
				border-radius: 1rem;
				transition: border 0.2s;
				border: 1px solid transparent;
				a {
					padding: 0 1rem;
					font-size: 0.8rem;
				}
				&:hover {
					border-color: var(--theme-color);
				}
			}
			.active {
				background-color: var(--theme-color);
				a {
					color: var(--text-default4-color);
				}
			}
		}
	}
}
</style>
