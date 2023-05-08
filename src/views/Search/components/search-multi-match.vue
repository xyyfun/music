<template>
	<div class="multi-match">
		<p>你可能感兴趣</p>
		<div class="multi-match-content">
			<div class="artist" v-for="item in artist_result" :key="item.id">
				<router-link :to="`/singer/${item.id}`">
					<img v-lazy="item.img1v1Url + '?param=130y130'" alt="" />
					<div class="info">
						<div class="title">
							<span>歌手：{{ item.name }}</span>
						</div>
						<div class="msg">
							<span>粉丝：{{ item.fansSize }}</span>
							<span>歌曲：{{ item.musicSize }}</span>
						</div>
					</div>
				</router-link>
			</div>
			<div class="album" v-for="item in album_result" :key="item.id">
				<router-link :to="`/album/${item.id}`">
					<img v-lazy="item.picUrl + '?param=130y130'" alt="" />
					<div class="info">
						<div class="title">
							<span>专辑：{{ item.name }}</span>
						</div>
						<div class="msg">
							<span>
								<router-link :to="`/singer/${val.id}`" v-for="val in item.artists" :key="val.id">
									{{ val.name }}
								</router-link>
							</span>
						</div>
					</div>
				</router-link>
			</div>
			<div class="playlist" v-for="item in playlist_result" :key="item.id">
				<router-link :to="`/playlist/${item.id}`">
					<img v-lazy="item.coverImgUrl + '?param=130y130'" alt="" />
					<div class="info">
						<div class="title">
							<span>歌单：{{ item.name }}</span>
						</div>
						<div class="msg">
							<span>歌曲：{{ item.trackCount }}</span>
							<span>播放：{{ item.playCount }}</span>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { searchMultiMatch } from '@/api/search';
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import useNumberSwitch from '@/hooks/useNumberSwitch';
export default {
	name: 'SearchMultiMatch',
	setup() {
		const route = useRoute();
		const artist_result = ref([]);
		const album_result = ref([]);
		const playlist_result = ref([]);
		const clearData = () => {
			artist_result.value = [];
			album_result.value = [];
			playlist_result.value = [];
		};
		onMounted(() => {
			watch(
				() => route.params.keyword,
				newVal => {
					clearData(); // 清空数据
					searchMultiMatch(newVal).then(data => {
						const { playlist, album, artist } = data.data.result;
						if (album) album_result.value = album;
						if (playlist) {
							playlist.forEach(e => (e.playCount = useNumberSwitch(e.playCount)));
							playlist_result.value = playlist;
						}
						if (artist) {
							artist.forEach(e => (e.fansSize = useNumberSwitch(e.fansSize)));
							artist_result.value = artist;
						}
					});
				},
				{ immediate: true }
			);
		});
		return { artist_result, album_result, playlist_result };
	},
};
</script>

<style lang="less" scoped>
.multi-match {
	> p {
		font-size: 0.8rem;
	}
	.multi-match-content {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: repeat(3, 28%);
		> div {
			height: 5rem;
			background-color: #eee;
			border-radius: 0.5rem;
			> a {
				display: flex;
				align-items: center;
				width: 100%;
				height: 100%;
				padding: 0.9rem;
				img {
					height: 100%;
					border-radius: 0.3rem;
				}
				.info {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					height: 100%;
					margin-left: 1rem;
					span {
						margin-right: 0.5rem;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
					.title {
						font-size: 0.9rem;
					}
					.msg {
						display: flex;
						font-size: 0.8rem;
						color: #939393;
						a {
							color: #939393;
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
		}
	}
}
</style>
