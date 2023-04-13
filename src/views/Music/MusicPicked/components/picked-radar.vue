<template>
	<div class="picked-radar">
		<div class="radar">
			<MusicTitleChild title="推荐电台" />
			<ul>
				<li v-for="item in radar" :key="item.id">
					<router-link :to="`/radioplaylist/${item.id}`" :title="item.name"
						><img v-lazy="item.picUrl + '?param=200y200'" /><AppMask
					/></router-link>
					<span class="ellipsis">{{ item.name }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import AppMask from '@/components/app-mask';
import { getRecommendRadar } from '@/api/music';
import { shallowRef } from 'vue';
export default {
	name: 'PickedRadar',
	components: { MusicTitleChild, AppMask },
	setup() {
		const radar = shallowRef([]);
		getRecommendRadar().then(data => {
			radar.value = data.data.result;
		});
		return { radar };
	},
};
</script>

<style lang="less" scoped>
.radar {
	ul {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 1.25rem;
		li {
			a {
				display: block;
				position: relative;
				transition: transform 0.3s;
				img {
					width: 100%;
					border-radius: 0.5rem;
				}
				&:hover {
					transform: translateY(-0.3rem);
				}
			}
			> span {
				display: block;
				font-size: 0.8rem;
				padding: 0.3rem 0;
			}
		}
	}
}
</style>
