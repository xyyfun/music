<template>
	<div class="private-content">
		<div class="header">
			<span>{{ user.nickname }}</span>
		</div>
		<div class="content scroll" ref="content">
			<ul>
				<li v-for="(item, index) in msgs" :key="index">
					<div class="time">
						<span>{{ item.time }}</span>
					</div>
					<div class="item" :class="item.fromUser.userId === userId ? 'user' : ''">
						<router-link :to="`/user?id=${item.fromUser.userId}`">
							<img
								v-lazy="item.fromUser.avatarUrl + '?param=220y220'"
								alt=""
								v-if="!(item.fromUser.userId === userId)" />
						</router-link>
						<div class="msg">
							<p>
								<span v-if="item.msg.title">{{ item.msg.title }}：</span>{{ item.msg.msg }}
							</p>
							<!-- 歌曲 -->
							<div class="song" v-if="item.msg.type === 1">
								<a href="javascript:;" @click="playSong(item.msg.song.id)">
									<img v-lazy="item.msg.song.album.picUrl" />
									<div class="info">
										<span>{{ item.msg.song.name }}</span>
										<span>
											<a href="javascript:;" v-for="value in item.msg.song.artists" :key="value.id">
												{{ value.name }}
											</a>
										</span>
									</div>
								</a>
							</div>
							<!-- 专辑 -->
							<div class="album" v-if="item.msg.type === 2">
								<router-link :to="`/album/${item.msg.album.id}`">
									<img v-lazy="item.msg.album.picUrl" alt="" />
									<div class="info">
										<span>{{ item.msg.album.name }}</span>
										<span>{{ item.msg.album.artist.name }}</span>
									</div>
								</router-link>
							</div>
							<!-- 歌单 -->
							<div class="playlist" v-if="item.msg.type === 4">
								<router-link :to="`/playlist/${item.msg.playlist.id}`">
									<img v-lazy="item.msg.playlist.coverImgUrl" alt="" />
									<div class="info">
										<span>{{ item.msg.playlist.name }}</span>
										<span>{{ item.msg.playlist.creator.nickname }}</span>
									</div>
								</router-link>
							</div>
							<!-- 视频 -->
							<div class="video" v-if="item.msg.type === 7">
								<router-link :to="`/player?vid=${item.msg.mv.id}&type=mv`">
									<img v-lazy="item.msg.mv.imgurl" />
									<p class="name">
										<span>{{ item.msg.mv.name }}</span>
										-
										<span>
											<a href="javascript:;" v-for="value in item.msg.mv.artists" :key="value.id">
												{{ value.name }}
											</a>
										</span>
									</p>
									<p class="duration">{{ item.msg.mv.duration }}</p>
									<p class="playCount">播放：{{ item.msg.mv.playCount }}</p>
									<i class="iconfont icon-bofang1"></i>
								</router-link>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="text-field">
			<textarea class="scroll" v-model="textInfo" :placeholder="`回复 ${user.nickname}`"></textarea>
			<a href="javascript:;" @click="forward">发送</a>
		</div>
	</div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { getPrivateContent, sendPrivate } from '@/api/message';
import { getUserDetail } from '@/api/user';
import { useDateFormat } from '@vueuse/core';
import { ref, onMounted, computed, watch } from 'vue';
import useNumberSwitch from '@/hooks/useNumberSwitch';
import message from '@/utils/message';
export default {
	name: 'PrivateContent',
	setup() {
		const route = useRoute();
		const store = useStore();
		const content = ref(null);
		const msgs = ref([]);
		const user = ref({});
		const textInfo = ref('');
		// 播放音乐
		const playSong = id => {
			store.commit('song/ISPLAY', false);
			store.dispatch('song/getMusic', id);
		};
		// 发送私信
		const forward = () => {
			if (!textInfo.value) {
				message({ type: 'warn', message: '请输入内容再发送！' });
				return;
			}
			sendPrivate(route.query.id, textInfo.value)
				.then(result => {
					const arr = result.data.newMsgs[0];
					arr.msg = JSON.parse(arr.msg);
					arr.time = useDateFormat(arr.time, 'YYYY-MM-DD HH:mm:ss');
					msgs.value.push(arr);
					textInfo.value = '';
				})
				.then(() => scrollBottom());
		};
		// 滚动底部
		const scrollBottom = () => {
			content.value.scrollTop = content.value.scrollHeight;
		};
		onMounted(() => {
			watch(
				() => route.query.id,
				newVal => {
					if (!(route.name === 'private' && newVal)) return;
					getPrivateContent(newVal)
						.then(result => {
							const arr = result.data.msgs.map(e => {
								e.msg = JSON.parse(e.msg);
								e.time = useDateFormat(e.time, 'YYYY-MM-DD HH:mm:ss');
								if (e.msg.mv) e.msg.mv.duration = useDateFormat(e.msg.mv.duration, 'mm:ss');
								if (e.msg.mv) e.msg.mv.playCount = useNumberSwitch(e.msg.mv.playCount);
								return e;
							});
							msgs.value = arr.reverse();
						})
						.then(() => scrollBottom());
					getUserDetail(newVal).then(result => {
						user.value = result.data.profile;
					});
				},
				{ immediate: true }
			);
		});
		return {
			content,
			msgs,
			user,
			textInfo,
			playSong,
			forward,
			userId: computed(() => store.getters['user/userId']),
		};
	},
};
</script>

<style lang="less" scoped>
.private-content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	.header {
		height: 3rem;
		line-height: 3rem;
		text-align: center;
		span {
			font-size: 1rem;
			font-weight: bold;
		}
	}
	.content {
		flex: 1;
		overflow-y: auto;
		padding: 0 1.78rem;
		ul {
			li {
				.time {
					display: flex;
					justify-content: center;
					span {
						font-size: 0.8rem;
						color: #949494;
						background-color: #ebebeb;
						padding: 0.3rem 0.5rem;
						border-radius: 1rem;
					}
				}
				.item {
					display: flex;
					margin: 1rem 0;
					a {
						img {
							width: 3.5rem;
							height: 3.5rem;
							border: 1px solid #ccc;
							border-radius: 50%;
							margin-right: 1rem;
						}
					}
					.msg {
						max-width: 70%;
						background-color: #ebebeb;
						padding: 0.5rem;
						border-radius: 0 0.5rem 0.5rem 0.5rem;
						p {
							font-size: 0.9rem;
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
								background-color: #fff;
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
					}
				}
				.user {
					justify-content: flex-end;
					.msg {
						border-radius: 0.5rem 0.5rem 0 0.5rem;
						background-color: #1ecc94;
						color: #fff;
					}
				}
			}
		}
	}
}
.text-field {
	display: flex;
	justify-content: center;
	padding: 0 1.78rem;
	margin: 1rem 0;
	textarea {
		width: 100%;
		min-height: 2.5rem;
		outline: none;
		border: none;
		resize: none;
		background-color: #efefef;
		padding: 0.5rem;
		border-radius: 0.5rem;
	}
	a {
		display: flex;
		justify-content: center;
		width: 8rem;
		height: 2.5rem;
		line-height: 2.5rem;
		text-align: center;
		font-size: 0.9rem;
		background-color: #1ecc94;
		border-radius: 0.5rem;
		color: #fff;
		margin-left: 1rem;
	}
}
</style>
