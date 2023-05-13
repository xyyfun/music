<template>
	<div class="detail">
		<div class="user">
			<router-link :to="`/user?id=${creator.userId}`" v-if="creator.userId">
				<img v-lazy="creator.avatarUrl + '?param=130y130'" alt="" />
				<span>{{ creator.nickname }}</span>
			</router-link>
			<template v-else>
				<router-link :to="`/singer/${item.id}`" v-for="item in artists" :key="item.id">
					<img v-lazy="item.img1v1Url + '?param=130y130'" alt="" />
					<span>{{ item.name }}</span>
				</router-link>
			</template>
		</div>
		<div class="info">
			<div class="description">
				<p>{{ description }}</p>
			</div>
			<div class="msg">
				<p>发布时间：{{ publishTime }}</p>
			</div>
			<div class="video-group" v-if="videoGroup.length">
				<router-link :to="`/video?id=${item.id}`" v-for="item in videoGroup" :key="item.id">
					{{ item.name }}
				</router-link>
			</div>
			<div class="count">
				<div class="praise">
					<a href="javascript:;" @click="subscribe(1)">
						<i class="iconfont icon-xihuan21"></i>
						<span>收藏</span>
					</a>
					<!-- <a href="javascript:;" @click="subscribe(2)">
						<i class="iconfont icon-xihuan2"></i>
						<span>已收藏</span>
					</a> -->
				</div>
				<div class="collect">
					<a href="javascript:;">
						<i class="iconfont icon-xiazai"></i>
						<span>下载</span>
					</a>
				</div>
				<div class="share">
					<a href="javascript:;">
						<i class="iconfont icon-fenxiang_2"></i>
						<span>分享</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { videoCollect, mvCollect } from '@/api/video';
import message from '@/utils/message';
import messageBox from '@/utils/message-box';
export default {
	name: 'PlayerDetail',
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const status = computed(() => store.state.user.status);
		// 收藏/取消收藏视频
		const subscribe = t => {
			// 判断是否登录
			if (status.value === 2) {
				const {
					query: { vid, type },
				} = route;
				const result = new Promise((resolv, reject) => {
					if (type === 'video') {
						videoCollect(vid, t).then(() => {
							if (t === 1) {
								resolv();
							} else {
								reject();
							}
						});
					} else {
						mvCollect(vid, t).then(() => {
							if (t === 1) {
								resolv();
							} else {
								reject();
							}
						});
					}
				});
				result.then(
					() => {
						message({ type: 'success', message: '收藏成功！' });
					},
					() => {
						message({ type: 'success', message: '已取消收藏！' });
					}
				);
			} else {
				messageBox({
					title: '提示',
					message: '收藏视频需要先登录，是否现在登录？',
					isShowCancel: true,
				}).then(
					() => {
						router.push('/login');
					},
					() => {}
				);
			}
		};
		// 监视路由变化获取数据
		watch(
			() => route.query.vid,
			newVal => {
				if (newVal && route.name === 'player') {
					if (route.query.type === 'video') {
						store.dispatch('video/videoDetail', route.query.vid);
					} else {
						store.dispatch('video/mvDetail', route.query.vid);
					}
				}
			},
			{ immediate: true }
		);
		return {
			subscribe,
			videoGroup: computed(() => store.getters['video/videoGroup']),
			publishTime: computed(() => store.state.video.detail.publishTime),
			creator: computed(() => store.state.video.creator),
			artists: computed(() => store.state.video.artists),
			description: computed(
				() => store.state.video.detail.description || store.state.video.detail.name
			),
		};
	},
};
</script>

<style scoped lang="less">
.detail {
	margin-top: 2rem;
	.user {
		display: flex;
		a {
			display: block;
			padding: 0 1rem;
			border-right: 1px solid #666;
			&:last-child {
				border: none;
			}
			img {
				width: 3rem;
				height: 3rem;
				border-radius: 50%;
				object-fit: contain;
				object-position: center center;
			}
			span {
				margin-left: 1rem;
				font-size: 0.9rem;
			}
		}
	}
	.info {
		> div {
			margin-top: 1rem;
		}
		.description {
			p {
				font-size: 1.3rem;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
		.video-group {
			display: flex;
			a {
				display: block;
				height: 1.5rem;
				line-height: 1.5rem;
				border-radius: 0.75rem;
				background-color: #eee;
				padding: 0 0.5rem;
				margin-right: 0.5rem;
				font-size: 0.8rem;
			}
		}
		.count {
			display: flex;
			> div {
				margin-right: 1rem;
			}
			a {
				display: block;
				height: 2rem;
				line-height: 2rem;
				border-radius: 1rem;
				border: 1px solid #666;
				padding: 0 1rem;
				span,
				i {
					font-size: 0.9rem;
				}
				span {
					padding-left: 0.3rem;
				}
				.icon-xihuan2 {
					color: #ff6664;
				}
			}
		}
	}
}
</style>
