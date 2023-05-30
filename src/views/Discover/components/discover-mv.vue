<template>
	<div class="discover-mv">
		<div class="mv overflow">
			<MusicTitleChild title="推荐MV" />
			<ul>
				<li v-for="item in mv" :key="item.id">
					<router-link :to="`/player?vid=${item.id}&type=mv`">
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
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(4, 1fr);
		li {
			a {
				display: block;
				position: relative;
				transition: transform 0.3s;
				background-color: var(--global-bg3);
				img {
					width: 100%;
					max-height: 191px;
					border-radius: 0.5rem;
					object-fit: contain;
					object-position: center center;
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
					color: var(--text-default-color);
				}
				.artistName {
					color: var(--text-desc-color);
				}
			}
		}
	}
}
</style>
