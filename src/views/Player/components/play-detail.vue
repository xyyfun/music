<template>
	<div class="detail">
		<div class="user" v-if="creator.length">
			<a href="javascript:;" v-for="item in creator" :key="item.id">
				<img v-lazy="item.img1v1Url + '?param=130y130'" alt="" />
				<span>{{ item.name }}</span>
			</a>
		</div>
		<div class="info">
			<div class="description">
				<p>{{ description }}</p>
			</div>
			<div class="msg">
				<p>发布时间：{{ publishTime }}</p>
			</div>
			<div class="video-group" v-if="videoGroup.length">
				<a href="javascript:;" v-for="item in videoGroup" :key="item.id">{{ item.name }}</a>
			</div>
			<div class="count">
				<div class="praise">
					<a href="javascript:;">
						<i class="iconfont icon-xihuan21"></i>
						<span>收藏</span>
					</a>
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
				<div class="comment">
					<a href="javascript:;">
						<i class="iconfont icon-pinglun1"></i>
						<span>评论</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
	name: 'PlayDetail',
	setup() {
		const store = useStore();
		const route = useRoute();
		// 监视路由变化获取数据
		watch(
			() => route.query.id,
			() => {
				if (route.query.type === 'video') {
					store.dispatch('video/videoDetail', route.query.id);
				} else {
					store.dispatch('video/mvDetail', route.query.id);
				}
			},
			{ immediate: true }
		);
		return {
			videoGroup: computed(() => store.getters['video/videoGroup']),
			publishTime: computed(() => store.state.video.detail.publishTime),
			creator: computed(() => store.state.video.creator),
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
			}
		}
	}
}
</style>
