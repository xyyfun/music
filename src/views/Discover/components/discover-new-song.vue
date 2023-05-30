<template>
	<div class="discover-new-song">
		<div class="songs">
			<MusicTitleChild title="推荐新歌曲" />
			<ul>
				<li v-for="item in songs" :key="item.id">
					<a href="javascript:;" @click="playMusic(item.id)">
						<img v-lazy="item.picUrl + '?param=130y130'" alt="" />
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
import { useStore } from 'vuex';
import { ref } from 'vue';
export default {
	name: 'DiscoverNewSong',
	components: { MusicTitleChild },
	setup() {
		const store = useStore();
		const songs = ref([]);
		// 播放音乐
		const playMusic = id => {
			store.commit('song/ISPLAY', false);
			store.dispatch('song/getMusic', id);
		};
		getRecommendNewSong().then(data => {
			songs.value = data.data.result;
		});
		return { songs, playMusic };
	},
};
</script>

<style lang="less" scoped>
.songs {
	ul {
		display: grid;
		grid-gap: 1rem;
		grid-template-rows: 4rem;
		li {
			border-radius: 0.3rem;
			transition: box-shadow 0.2s;
			background-color: var(--global-bg4);
			a {
				display: flex;
				width: 100%;
				height: 100%;
				img {
					width: 4rem;
					height: 100%;
					border-radius: 0.3rem;
					padding: 0.1rem;
				}
				.information {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding: 0 0.8rem;
					max-width: calc(100% - 4rem);
					> span {
						font-size: 0.8rem;
					}
					.songName {
						color: var(--text-default-color);
					}
					.artistName {
						color: var(--text-default3-a-color);
					}
				}
			}
			&:hover {
				box-shadow: 0 0 10px var(--shadow-black);
			}
		}
	}
}
@media screen and (max-width: 1080px) {
	.songs {
		ul {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
}
@media screen and (min-width: 1024px) {
	.songs {
		ul {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
}
@media screen and (min-width: 1280px) {
	.songs {
		ul {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
}
@media screen and (min-width: 1536px) {
	.songs {
		ul {
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
	}
}
</style>
