<template>
	<div class="message-notice scroll">
		<template v-if="messageType">
			<div class="item" v-for="(item, index) in messageList" :key="index">
				<img v-lazy="item.comment.user.avatarUrl + '?param=220y220'" alt="" />
				<div class="info">
					<div class="userName">
						<router-link :to="`/user?id=${item.comment.user.userId}`">
							{{ item.comment.user.nickname }}
						</router-link>
						<span class="time">{{ item.comment.time }}</span>
					</div>
					<div class="content">
						<p><span>评论：</span>{{ item.comment.content }}</p>
					</div>
					<!-- 歌单 -->
					<div class="playlist" v-if="item.resourceType === 0">
						<router-link :to="`/playlist/${item.resource.id}`">
							<img v-lazy="item.resource.coverImgUrl" alt="" />
							<div class="info">
								<span>{{ item.resource.name }}</span>
								<span>{{ item.resource.creator.nickname }}</span>
							</div>
						</router-link>
					</div>
					<!-- 专辑 -->
					<div class="album" v-if="item.resourceType === 3">
						<router-link :to="`/album/${item.resource.id}`">
							<img v-lazy="item.resource.picUrl" alt="" />
							<div class="info">
								<span>{{ item.resource.name }}</span>
								<span>{{ item.resource.artist.name }}</span>
							</div>
						</router-link>
					</div>
					<!-- 歌曲 -->
					<div class="song" v-if="item.resourceType === 4">
						<a href="javascript:;" @click="playSong(item.resource.id)">
							<img v-lazy="item.resource.album.picUrl" />
							<div class="info">
								<span>{{ item.resource.name }}</span>
								<span>
									<a href="javascript:;" v-for="value in item.resource.artists" :key="value.id">
										{{ value.name }}
									</a>
								</span>
							</div>
						</a>
					</div>
					<!-- 视频 -->
					<div class="video" v-if="item.resourceType === 5">
						<router-link :to="`/player?vid=${item.resource.id}&type=mv`">
							<img v-lazy="item.resource.imgurl" />
							<p class="name">
								<span>{{ item.resource.name }}</span>
								-
								<span>
									<a href="javascript:;" v-for="value in item.resource.artists" :key="value.id">
										{{ value.name }}
									</a>
								</span>
							</p>
							<p class="duration">{{ item.resource.duration }}</p>
							<p class="playCount">播放：{{ item.resource.playCount }}</p>
							<i class="iconfont icon-bofang1"></i>
						</router-link>
					</div>
					<div class="utils">
						<a href="javascript:;"><i class="iconfont icon-pinglun1"></i> 回复</a>
					</div>
				</div>
			</div>
		</template>
		<template v-else>
			<div class="item" v-for="(item, index) in messageList" :key="index">
				<img v-lazy="item.user.avatarUrl + '?param=220y220'" alt="" />
				<div class="info">
					<div class="userName">
						<router-link :to="`/user?id=${item.user.userId}`">{{ item.user.nickname }}</router-link>
					</div>
					<div class="content">
						<p><span>回复我：</span>{{ item.content }}</p>
					</div>
					<div class="myComment">
						<span>{{ item.beRepliedContent }}</span>
					</div>
					<div class="utils">
						<a href="javascript:;"> <i class="iconfont icon-pinglun1"></i> 回复</a>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import useNumberSwitch from '@/hooks/useNumberSwitch';
import { useDateFormat } from '@vueuse/core';
import { getCommentMessage, getFormeMessage } from '@/api/message';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
	name: 'MessageNotice',
	props: ['messageType'],
	setup(props) {
		const store = useStore();
		const messageList = ref([]);
		const userId = computed(() => store.getters['user/userId']);
		const playSong = id => {
			store.commit('song/ISPLAY', false);
			store.dispatch('song/getMusic', id);
		};
		// 获取数据
		const getMessageList = type => {
			if (type) {
				// 艾特我
				getFormeMessage(1).then(result => {
					const arr = result.data.forwards.map(e => {
						e.json = JSON.parse(e.json);
						e.json.comment.time = useDateFormat(e.json.comment.time, 'YYYY-MM-DD HH:mm:ss');
						if (e.json.resourceType === 5) {
							e.json.resource.playCount = useNumberSwitch(e.json.resource.playCount);
							e.json.resource.duration = useDateFormat(e.json.resource.duration, 'mm:ss');
						}
						return e.json;
					});
					messageList.value = arr.reverse();
				});
			} else {
				// 评论
				getCommentMessage(userId.value).then(result => {
					messageList.value = result.data.comments;
				});
			}
		};
		onMounted(() => {
			const type = props.messageType;
			getMessageList(type);
		});
		return { messageList, playSong };
	},
};
</script>

<style lang="less" scoped>
.message-notice {
	height: 100%;
	overflow-y: auto;
	padding-right: 1.78rem;
	.item {
		display: flex;
		margin: 1rem 0;
		> img {
			width: 3rem;
			height: 3rem;
			object-fit: cover;
			border-radius: 50%;
		}
		> .info {
			flex: 1;
			margin-left: 1rem;
			border-bottom: 1px solid #ddd;
			> div {
				margin-bottom: 0.5rem;
			}
			.userName {
				display: flex;
				justify-content: space-between;
				span,
				a {
					font-size: 0.8rem;
				}
				a {
					color: #1ed0a1;
				}
			}
			.content {
				p {
					font-size: 0.8rem;
				}
			}
			.myComment {
				background-color: #eee;
				padding: 0 0.5rem;
				border-radius: 0.5rem;
				span {
					line-height: 2rem;
				}
			}
			.utils {
				display: flex;
				justify-content: flex-end;
				a {
					display: block;
					width: 8rem;
					height: 2.2rem;
					line-height: 2.2rem;
					text-align: center;
					background-color: #e3e3e3;
					color: #000;
					border-radius: 5rem;
					font-size: 0.9rem;
					i {
						padding: 0 5px;
					}
				}
			}
			// 视频
			.video {
				> a {
					display: block;
					position: relative;
					max-width: 13rem;
					height: 8rem;
					img {
						position: absolute;
						top: 0;
						left: 0;
						width: 13rem;
						height: 8rem;
						object-fit: cover;
						border-radius: 0.5rem;
					}
					p {
						position: absolute;
						font-size: 0.8rem;
						color: #fff;
						span {
							a {
								color: #fff;
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
					.duration {
						right: 0.5rem;
						bottom: 0.5rem;
					}
					.name {
						top: 0.5rem;
						left: 0.5rem;
					}
					.playCount {
						left: 0.5rem;
						bottom: 0.5rem;
					}
					i {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						color: #fff;
						font-size: 2.5rem;
					}
				}
			}
			// 歌
			// 专辑
			.song,
			.album,
			.playlist {
				padding-top: 0.5rem;
				> a {
					display: flex;
					max-width: 13rem;
					padding: 0.5rem;
					background-color: #eee;
					border-radius: 0.5rem;
					img {
						width: 3rem;
						height: 3rem;
						border-radius: 0.5rem;
					}
					.info {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						margin: 0 0.5rem;
						span {
							font-size: 0.8rem;
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
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
}
</style>
