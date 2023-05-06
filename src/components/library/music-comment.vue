<template>
	<div class="music-comment">
		<div class="comment">
			<!-- 发布评论 -->
			<div class="pubComment">
				<textarea class="scroll" placeholder="期待你的神评论"></textarea>
				<a href="javascript:;">发布评论</a>
			</div>
			<!-- 热门评论 -->
			<div class="hotComment" v-if="hotComments.length">
				<div class="title"><span>热门评论</span></div>
				<div class="item" v-for="item in hotComments" :key="item.commentId">
					<div class="userInfo">
						<a href="javascript:;">
							<div class="image">
								<img class="avatarUrl" v-lazy="item.user.avatarUrl + '?param=130y130'" alt="" />
								<img
									class="pendantData"
									v-if="item.pendantData"
									:src="item.pendantData.imageUrl + '?param=130y130'"
									alt="" />
							</div>
							<div class="msg">
								<div>
									<p
										:style="
											item.user.vipRights && item.user.vipRights.associator ? 'color:#ff6664' : ''
										">
										{{ item.user.nickname }}
									</p>
									<img
										v-if="item.user.vipRights && item.user.vipRights.associator"
										:src="item.user.vipRights.associator.iconUrl + '?param=80y34'"
										alt="" />
								</div>
								<div>
									<p>{{ item.timeStr }}</p>
									<p v-if="item.ipLocation.ip">IP:来自{{ item.ipLocation.location }}</p>
									<p v-else>IP:未知</p>
								</div>
							</div>
						</a>
					</div>
					<div class="content">
						<p>{{ item.content }}</p>
					</div>
					<div class="more">
						<div class="praise">
							<a
								href="javascript:;"
								@click="like(item)"
								:style="item.liked ? 'color: #1ecc94' : ''">
								<i class="iconfont icon-dianzan"></i>
								<span>{{ item.likedCount }}</span>
							</a>
							<a href="javascript:;" @click="replyComment">回复</a>
						</div>
					</div>
				</div>
			</div>
			<!-- 所有评论 -->
			<div class="allComment" v-if="comments.length">
				<div class="title"><span>全部评论</span></div>
				<div class="item" v-for="item in comments" :key="item.commentId">
					<div class="userInfo">
						<a href="javascript:;">
							<div class="image">
								<img class="avatarUrl" v-lazy="item.user.avatarUrl + '?param=130y130'" alt="" />
								<img
									class="pendantData"
									v-if="item.pendantData"
									:src="item.pendantData.imageUrl + '?param=130y130'"
									alt="" />
							</div>
							<div class="msg">
								<div>
									<p
										:style="
											item.user.vipRights && item.user.vipRights.associator ? 'color:#ff6664' : ''
										">
										{{ item.user.nickname }}
									</p>
									<img
										v-if="item.user.vipRights && item.user.vipRights.associator"
										:src="item.user.vipRights.associator.iconUrl + '?param=80y34'"
										alt="" />
								</div>
								<div>
									<p>{{ item.timeStr }}</p>
									<p v-if="item.ipLocation.location">IP：{{ item.ipLocation.location }}</p>
									<p v-else>IP：未知</p>
								</div>
							</div>
						</a>
					</div>
					<div class="content">
						<p>
							{{ item.content }}
						</p>
					</div>
					<div class="more">
						<div class="praise">
							<a
								href="javascript:;"
								@click="like(item)"
								:style="item.liked ? 'color: #1ecc94' : ''">
								<i class="iconfont icon-dianzan"></i>
								<span>{{ item.likedCount }}</span>
							</a>
							<a href="javascript:;" @click="replyComment">回复</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import message from '@/utils/message';
import { commentLike } from '@/api/comment';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
export default {
	name: 'MusicComment',
	props: {
		comments: {
			type: Array,
			default: () => [],
		},
		hotComments: {
			type: Array,
			default: () => [],
		},
	},
	setup() {
		const route = useRoute();
		const store = useStore();
		// 默认参数
		const params = reactive({
			id: null,
			cid: null,
			t: null,
			type: null,
		});
		const currentMusicID = computed(() => store.state.song.currentMusicID);
		// 请求操作
		const changCommentLike = liked => {
			commentLike({ ...params }).then(result => {
				console.log(result);
				if (liked) {
					message({ type: 'success', message: '已取消点赞！' });
				} else {
					message({ type: 'success', message: '点赞成功！' });
				}
			});
		};
		// 点赞/取消点赞
		const like = item => {
			const { commentId, liked } = item;
			const {
				name,
				params: { id },
				query: { vid, type },
			} = route;
			liked ? (params.t = 0) : (params.t = 1); // 判断是否已经点赞
			params.cid = commentId; // 评论id
			if (name === 'playlist') {
				params.id = id;
				params.type = 2;
			} else if (name === 'album') {
				params.id = id;
				params.type = 3;
			} else if (name === 'comment') {
				params.id = currentMusicID.value;
				params.type = 0;
			} else if (name === 'player') {
				params.id = vid;
				if (type === 'video') {
					params.type = 5;
				} else {
					params.type = 1;
				}
			}
			changCommentLike(liked);
		};
		// 回复评论
		const replyComment = () => {
			message({ type: 'warn', message: '功能开发中，敬请期待！' });
		};
		return { like, replyComment };
	},
};
</script>

<style lang="less" scoped>
.music-comment {
	.comment {
		.title {
			padding-top: 2rem;
			span {
				font-size: 0.9rem;
			}
		}
		.pubComment {
			display: flex;
			flex-flow: wrap;
			justify-content: flex-end;
			textarea {
				width: 100%;
				height: 5rem;
				outline: none;
				border: none;
				resize: none;
				background-color: #efefef;
				padding: 1rem;
			}
			a {
				display: flex;
				justify-content: center;
				width: 8rem;
				height: 2.5rem;
				line-height: 2.5rem;
				text-align: center;
				font-size: 0.9rem;
				background-color: #1fd2aa;
				border-radius: 0.5rem;
				color: #fff;
				margin-top: 1rem;
			}
		}
		.item {
			padding: 2rem 0;
			border-bottom: 1px solid #ddd;
			.userInfo {
				a {
					display: flex;
					.image {
						display: flex;
						justify-content: center;
						justify-items: center;
						align-items: center;
						position: relative;
						width: 4rem;
						height: 4rem;
						img {
							object-fit: cover;
						}
						.avatarUrl {
							width: 3rem;
							height: 3rem;
							border-radius: 50%;
						}
						.pendantData {
							position: absolute;
							left: 0;
							top: 0;
						}
					}
					.msg {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						margin: 0 0.5rem;
						> div {
							display: flex;
							align-items: center;
							span,
							p {
								font-size: 0.9rem;
								color: #7b7b7b;
								margin-right: 1rem;
							}
							img {
								width: 2.63rem;
								height: 1rem;
							}
						}
					}
				}
			}
			.content {
				margin: 0.5rem 0;
				margin-left: 4.5rem;
				p {
					font-size: 0.9rem;
					word-wrap: break-word;
				}
			}
			.more {
				margin-left: 4.5rem;
				a {
					font-size: 0.9rem;
				}
				.praise {
					padding: 0.5rem 0;
					a {
						i {
							font-size: 0.9rem;
						}
						&:last-child {
							margin-left: 1rem;
						}
					}
				}
			}
		}
	}
}
</style>
