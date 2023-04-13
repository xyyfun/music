<template>
	<div class="app-comment scroll">
		<div class="comment-content">
			<div class="msg" v-if="detail.name">
				<img v-lazy="detail.al.picUrl + '?param=130y130'" alt="" />
				<div class="info">
					<p>{{ detail.name }}</p>
					<div class="singer">
						<span>
							歌手：<router-link
								:to="`/singer/${item.id}`"
								v-for="item in detail.ar"
								:key="item.id">
								{{ item.name }}
							</router-link>
						</span>
						<span>
							<router-link :to="`/album/${detail.al.id}`">专辑：{{ detail.al.name }}</router-link>
						</span>
					</div>
				</div>
			</div>
			<MusicComment :comments="comments" :hotComments="hotComments" />
			<AppMore @loadMore="loadMore" :isMore="isMore" />
		</div>
	</div>
</template>

<script>
import MusicComment from '@/components/library/music-comment';
import AppMore from '@/components/app-more';
import { getSongDetail, getSongComment } from '@/api/songs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
export default {
	name: 'AppComment',
	components: { MusicComment, AppMore },
	setup() {
		const router = useRouter();
		const store = useStore();
		const comments = ref([]);
		const hotComments = ref([]);
		const detail = ref({});
		const isMore = ref(true);
		const loadMore = () => {};
		watch(
			() => store.state.song.currentMusicID,
			newVal => {
				// 歌曲评论
				if (newVal) {
					getSongComment(newVal).then(data => {
						comments.value = data.data.comments;
						hotComments.value = data.data.hotComments;
					});
					// 歌曲详情
					getSongDetail(newVal).then(data => {
						const { ar, al, name } = data.data.songs[0];
						detail.value = { ar, al, name };
					});
				} else {
					router.replace('/');
				}
			},
			{ immediate: true }
		);
		return {
			comments,
			hotComments,
			loadMore,
			isMore,
			detail,
		};
	},
};
</script>

<style lang="less" scoped>
.app-comment {
	flex: 1;
	overflow-y: auto;
	.comment-content {
		padding: 0 1.78rem;
		.msg {
			display: flex;
			padding: 1rem 0;
			img {
				width: 9rem;
				border-radius: 0.5rem;
			}
			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding-left: 1rem;
				p {
					font-size: 2rem;
				}
				.singer {
					span {
						font-size: 0.8rem;
						margin-right: 1rem;
						a {
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
