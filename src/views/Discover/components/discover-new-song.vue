<template>
	<div class="discover-new-song">
		<div class="songs overflow">
			<MusicTitleChild title="推荐新歌曲" />
			<ul>
				<li v-for="item in songs" :key="item.id">
					<a href="">
						<img v-lazy="item.picUrl" alt="" />
						<div class="information">
							<span class="songName ellipsis">{{ item.name }}</span>
							<span class="artistName ellipsis">{{ item.song.artists[0].name }}</span>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import { getRecommendNewSong } from '@/api/discover';
import { ref } from 'vue';
export default {
	name: 'DiscoverNewSong',
	components: { MusicTitleChild },
	setup() {
		const songs = ref([]);
		getRecommendNewSong().then(data => {
			songs.value = data.data.result;
		});
		return { songs };
	},
};
</script>

<style lang="less" scoped>
.songs {
	ul {
		display: grid;
		grid-gap: 1rem;
		li {
			border-radius: 0.3rem;
			transition: box-shadow 0.2s;
			a {
				display: flex;
				width: 100%;
				height: 100%;
				img {
					border-radius: 0.3rem;
					padding: 0.1rem;
				}
				.information {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding: 0 0.8rem;
					> span {
						font-size: 0.8rem;
					}
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
}
@media screen and (max-width: 1080px) {
	.songs {
		ul {
			grid-template-rows: repeat(5, 3.5rem);
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
}
@media screen and (min-width: 1024px) {
	.songs {
		ul {
			grid-template-rows: repeat(4, 3.5rem);
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
}
@media screen and (min-width: 1280px) {
	.songs {
		ul {
			grid-template-rows: repeat(3, 3.5rem);
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
}
@media screen and (min-width: 1536px) {
	.songs {
		ul {
			grid-template-rows: 3.5rem 3.5rem;
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
	}
}
</style>
