<template>
	<div class="singer-description" v-if="artist.id">
		<div class="description">
			<img :src="artist.avatar + '?param=500y500'" alt="" />
			<div class="meta">
				<div class="singerName">
					<div class="name">{{ artist.name }}</div>
					<div class="identify" v-if="identify">
						<img v-if="identify.imageUrl" :src="identify.imageUrl + '?param=50y50'" alt="" />
						<span>{{ identify.imageDesc }}</span>
					</div>
				</div>
				<div class="desc">
					<span>{{ artist.briefDesc }}</span>
				</div>
				<div class="utils">
					<ul>
						<li>
							<a href="javascript:;" v-if="user.followed" @click="follow(artist.id, 0)">
								<i class="iconfont icon-xihuan2"></i>已关注
							</a>
							<a href="javascript:;" v-else class="active" @click="follow(artist.id, 1)">
								<i class="iconfont icon-xinjian"></i> 关注
							</a>
						</li>
						<li v-if="user.userId">
							<router-link :to="`/user?id=${user.userId}`">
								<i class="iconfont icon-user"></i>个人主页
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getSingerDetail, followSinger } from '@/api/singer';
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import message from '@/utils/message';
export default {
	name: 'SingerDescription',
	setup() {
		const route = useRoute();
		const artist = ref({});
		const identify = ref({});
		const user = ref({});
		// 关注/取消关注
		const follow = (id, t) => {
			followSinger(id, t).then(() => {
				if (t) {
					message({ type: 'success', message: '关注成功！' });
					user.value.followed = true;
				} else {
					message({ type: 'success', message: '取消关注成功！' });
					user.value.followed = false;
				}
			});
		};
		onMounted(() => {
			watch(
				() => route.params.id,
				newVal => {
					if (newVal && route.name === 'singer') {
						artist.value = {};
						identify.value = {};
						user.value = {};
						if (newVal) {
							getSingerDetail(newVal).then(data => {
								const { artist: art, identify: ide, user: use } = data.data.data;
								artist.value = art;
								identify.value = ide;
								user.value = use || {};
							});
						}
					}
				},
				{ immediate: true }
			);
		});
		return { user, artist, identify, follow };
	},
};
</script>

<style lang="less" scoped>
.singer-description {
	.description {
		position: relative;
		width: 100%;
		height: 28rem;
		> img {
			position: absolute;
			width: 100%;
			object-fit: scale-down;
		}
		.meta {
			position: absolute;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			bottom: 0;
			background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent 100%);
			padding: 1.78rem;
			width: 100%;
			height: 50%;
			.singerName {
				display: flex;
				align-items: flex-end;
				color: var(--text-default4-color);
				.name {
					font-size: 3rem;
				}
				.identify {
					display: flex;
					align-items: center;
					height: 1.5rem;
					margin-bottom: 0.5rem;
					margin-left: 0.5rem;
					background-color: rgba(237, 64, 54, 0.3);
					border-radius: 0.75rem;
					img {
						height: 1.5rem;
						font-size: 1rem;
					}
					span {
						padding: 0.5rem;
					}
				}
			}
			.desc {
				span {
					text-indent: 2rem;
					color: 0.8rem;
					color: var(--text-default2-color);
					margin-bottom: 1rem;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				}
			}
			.utils {
				ul {
					display: flex;
					li {
						margin-right: 1rem;
						a {
							padding: 0.5rem 2rem;
							background-color: var(--global-bg3);
							backdrop-filter: blur(5px);
							color: var(--text-default-color);
							border-radius: 5rem;
							font-size: 0.9rem;
						}
						i {
							padding: 0 5px;
						}
						.icon-xihuan2 {
							color: var(--theme-color-like);
						}
						.active {
							background-color: var(--theme-color);
							color: var(--text-default4-color);
						}
					}
				}
			}
		}
	}
}
</style>
