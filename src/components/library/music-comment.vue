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
								<img class="avatarUrl" :src="item.user.avatarUrl + '?param=130y130'" alt="" />
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
							<i class="iconfont icon-dianzan"></i><span>{{ item.likedCount }}</span>
							<a href="javascript:;">回复</a>
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
								<img class="avatarUrl" :src="item.user.avatarUrl + '?param=130y130'" alt="" />
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
						<p>
							{{ item.content }}
						</p>
					</div>
					<div class="more">
						<div class="praise">
							<i class="iconfont icon-dianzan"></i><span>{{ item.likedCount }}</span>
							<a href="javascript:;">回复</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
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
				}
			}
			.more {
				margin-left: 4.5rem;
				a {
					font-size: 0.9rem;
				}
				.praise {
					padding: 0.5rem 0;
					i {
						font-size: 0.9rem;
					}
					a {
						margin-left: 1rem;
					}
				}
			}
		}
	}
}
</style>
