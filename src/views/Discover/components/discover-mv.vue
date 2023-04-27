<template>
	<div class="discover-mv">
		<div class="mv overflow">
			<MusicTitleChild title="推荐MV" />
			<ul>
				<li v-for="item in mv" :key="item.id">
					<router-link :to="`/player?id=${item.id}&type=mv`">
						<img v-lazy="item.picUrl" alt="" />
						<AppMask />
					</router-link>
					<div class="information">
						<span class="songName">{{ item.name }}</span>
						<span class="artistName">{{ item.artistName }}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import AppMask from '@/components/app-mask';
import { getRecommendMV } from '@/api/discover';
import { ref } from 'vue';
export default {
	name: 'DiscoverMV',
	components: { MusicTitleChild, AppMask },
	setup() {
		const mv = ref([]);
		getRecommendMV().then(data => {
			mv.value = data.data.result;
		});
		return { mv };
	},
};
</script>

<style lang="less" scoped>
.mv {
	ul {
		display: flex;
		li {
			flex-shrink: 0;
			width: 25%;
			padding-right: 1rem;
			a {
				display: block;
				position: relative;
				transition: transform 0.3s;
				img {
					border-radius: 0.5rem;
				}
				&:hover {
					transform: translateY(-0.3rem);
				}
			}
			.information {
				display: flex;
				flex-direction: column;
				font-size: 0.9rem;
				.songName {
					color: #334155;
				}
				.artistName {
					color: #94a3b8;
				}
			}
		}
	}
}
</style>
