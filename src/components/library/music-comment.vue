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
						<img :src="item.user.avatarUrl" alt="" />
						<div class="msg">
							<p>{{ item.user.nickname }}</p>
							<p>
								{{ item.timeStr }}
								<span v-if="item.ipLocation.ip">IP：来自{{ item.ipLocation.location }}</span>
								<span v-else>IP：未知</span>
							</p>
						</div>
					</div>
					<div class="content">
						<p>
							{{ item.content }}
						</p>
					</div>
					<div class="more">
						<div class="praise">
							<i class="iconfont icon-dianzan"></i>
							<span>{{ item.likedCount }}<a href="javascript:;">回复</a></span>
						</div>

						<a href="javascript:;" v-if="item.beReplied.length">
							查看{{ item.beReplied.length }}条评论
						</a>
						<div class="item" v-if="false">
							<div class="userInfo">
								<img :src="item.user.avatarUrl" alt="" />
								<div class="msg">
									<p>{{ item.user.nickname }}</p>
									<p>
										{{ item.timeStr }}
										<span v-if="item.ipLocation.ip">IP：来自{{ item.ipLocation.location }}</span>
										<span v-else>IP：未知</span>
									</p>
								</div>
							</div>
							<div class="content">
								<p>
									{{ item.content }}
								</p>
							</div>
							<div class="more">
								<div class="praise">
									<i class="iconfont icon-dianzan"></i>
									<span>{{ item.likedCount }}<a href="javascript:;">回复</a></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 所有评论 -->
			<div class="allComment" v-if="comments.length">
				<div class="title"><span>全部评论</span></div>
				<div class="item" v-for="item in comments" :key="item.commentId">
					<div class="userInfo">
						<img :src="item.user.avatarUrl" alt="" />
						<div class="msg">
							<p>{{ item.user.nickname }}</p>
							<p>
								{{ item.timeStr }}
								<span v-if="item.ipLocation.ip">IP:来自{{ item.ipLocation.location }}</span>
								<span v-else>IP:未知</span>
							</p>
						</div>
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
						<a href="javascript:;" v-if="item.beReplied.length" @click="isShowMore">
							查看{{ item.beReplied.length }}条评论
						</a>
						<div class="item" v-if="false">
							<div class="userInfo">
								<img :src="item.user.avatarUrl" alt="" />
								<div class="msg">
									<p>{{ item.user.nickname }}</p>
									<p>
										{{ item.timeStr }}
										<span v-if="item.ipLocation.ip">IP：来自{{ item.ipLocation.location }}</span>
										<span v-else>IP：未知</span>
									</p>
								</div>
							</div>
							<div class="content">
								<p>
									{{ item.content }}
								</p>
							</div>
							<div class="more">
								<div class="praise">
									<i class="iconfont icon-dianzan"></i>
									<span>{{ item.likedCount }}<a href="javascript:;">回复</a></span>
								</div>
							</div>
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
	setup() {},
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
				display: flex;
				img {
					width: 2.5rem;
					height: 2.5rem;
					border-radius: 50%;
				}
				.msg {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					margin: 0 1rem;
					span,
					p {
						font-size: 0.9rem;
						color: #7b7b7b;
					}
					span {
						margin: 0 1rem;
					}
				}
			}
			.content {
				margin: 0.5rem 0;
				margin-left: 3.5rem;
				p {
					font-size: 0.9rem;
				}
			}
			.more {
				margin-left: 3.5rem;
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
				.item {
					background-color: #efefef;
					border-radius: 0.5rem;
					padding-left: 1.78rem;
				}
			}
		}
	}
}
</style>
