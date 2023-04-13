<template>
	<div class="album-hot-list">
		<div class="hot-list">
			<MusicTitleChild title="本周最热" />
			<ul>
				<li v-for="item in hotAlbum" :key="item.id">
					<router-link :to="`/album/${item.id}`">
						<img v-lazy="item.picUrl + '?param=200y200'" alt="" />
					</router-link>
					<span class="ellipsis">{{ item.name }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import { getHotAlbum } from '@/api/music';
import { shallowRef } from 'vue';
export default {
	name: 'AlbumHotList',
	components: { MusicTitleChild },
	setup() {
		const hotAlbum = shallowRef([]);
		getHotAlbum().then(data => {
			hotAlbum.value = data.data.albums;
		});
		return { hotAlbum };
	},
};
</script>

<style lang="less" scoped>
.hot-list {
	ul {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		li {
			a {
				img {
					width: 100%;
					border-radius: 0.5rem;
				}
			}
			span {
				display: block;
				font-size: 0.9rem;
			}
		}
	}
}
</style>
