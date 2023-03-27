<template>
	<div class="ranking-official-list">
		<div class="official-list">
			<MusicTitleChild title="官方榜" />
			<ul>
				<li class="module" v-for="item in officialList" :key="item.id">
					<img v-lazy="item.coverImgUrl" alt="" />
					<MusicPlayCount :playCount="item.playCount" />
					<div class="part">
						<h2>{{ item.name }}</h2>
						<ul>
							<li class="song ellipsis" v-for="(song, index) in item.tracks" :key="index">
								{{ index + 1 }}、{{ song.first }}-{{ song.second }}
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicPlayCount from '@/components/library/music-play-count';
export default {
	name: 'RankingOfficialList',
	components: { MusicTitleChild, MusicPlayCount },
	props: {
		officialList: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="less" scoped>
.official-list {
	> ul {
		display: grid;
		gap: 1.25rem;
		.module {
			position: relative;
			display: flex;
			align-items: center;
			border-radius: 0.5rem;
			background-color: #efefef;
			transition: box-shadow 0.2s;
			cursor: pointer;
			img {
				border-radius: 0.5rem;
			}
			> .plays-number {
				right: 55%;
			}
			.part {
				padding: 0 1.25rem;
				max-width: calc(100% - 10rem);
				h2 {
					font-size: 1.3rem;
				}
				ul {
					display: flex;
					flex-wrap: wrap;
					margin-top: 1rem;
					li {
						font-size: 0.8rem;
					}
				}
			}
			&:hover {
				box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
			}
		}
	}
}
@media screen and (max-width: 1536px) {
	.official-list {
		ul {
			grid-template-rows: repeat(2, 10rem);
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
}
@media screen and (min-width: 1536px) {
	.official-list {
		ul {
			grid-template-rows: repeat(1, 10rem);
			grid-template-columns: repeat(4, 1fr);
		}
	}
}
</style>
