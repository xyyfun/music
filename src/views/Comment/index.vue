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
			<AppMore v-if="hotComments.length" @loadMore="loadMore" :isMore="isMore" />
		</div>
	</div>
</template>

<script>
import MusicComment from '@/components/library/music-comment';
import AppMore from '@/components/app-more';
import { getSongDetail } from '@/api/songs';
import { getHotComment, getSongComment } from '@/api/comment';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';
export default {
	name: 'AppComment',
	components: { MusicComment, AppMore },
	setup() {
		const router = useRouter();
		const store = useStore();
		const comments = ref([]); // 全部评论
		const hotComments = ref([]); // 热门评论
		const detail = ref({}); // 歌曲详情
		const isMore = ref(false); // 是否拥有更多
		const offset = ref(1); // 偏移数
		const currentMusicID = computed(() => store.state.song.currentMusicID);
		const loadMore = () => {
			offset.value++;
			getData();
		};
		const getData = () => {
			getSongComment(currentMusicID.value, offset.value).then(data => {
				data.data.comments.forEach(e => comments.value.push(e));
				isMore.value = data.data.more;
			});
		};
		watch(
			currentMusicID,
			newVal => {
				if (newVal) {
					// 全部评论
					getData();
					// 热门评论
					getHotComment(newVal, 0, 1).then(data => (hotComments.value = data.data.hotComments));
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
