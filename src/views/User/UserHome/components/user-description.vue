<template>
	<div class="user-description">
		<div class="description" v-if="userInfo.userId">
			<img v-lazy="userInfo.avatarUrl + '?param=300y300'" alt="" />
			<div class="info">
				<div class="nickname">
					<span class="gender" v-if="userInfo.gender">
						<i class="iconfont icon-boy" v-if="userInfo.gender === 1"></i>
						<i class="iconfont icon-girl" v-else></i>
					</span>
					<span class="userName">{{ userInfo.nickname }}</span>
					<i>Lv.{{ level }}</i>
				</div>
				<div class="identify" v-if="identify">
					<div>
						<img v-lazy="identify.imageUrl" alt="" />
						<span>认证</span>
					</div>
					<span>{{ identify.imageDesc }}</span>
				</div>
				<div class="follow">
					<span>粉丝：{{ userInfo.followeds }}</span>
					<span>关注：{{ userInfo.follows }}</span>
				</div>
				<div class="signature" v-if="userInfo.signature">
					<span>个人介绍：{{ userInfo.signature }}</span>
				</div>
				<div class="utils">
					<ul>
						<li v-if="userInfo.userId !== userId">
							<a href="javascript:;" @click="follow(0)" v-if="userInfo.followed">
								<i class="iconfont icon-xihuan2"></i>已关注
							</a>
							<a href="javascript:;" @click="follow(1)" v-else>
								<i class="iconfont icon-xinjian"></i>关注
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getUserDetail, followUser } from '@/api/user';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import message from '@/utils/message';
export default {
	name: 'UserDescription',
	setup() {
		const route = useRoute();
		const store = useStore();
		const userInfo = ref({}); // 用户信息
		const bindings = ref([]); // 绑定
		const identify = ref(null); // 认证荣誉
		const level = ref(0);
		// 关注/取消关注
		const follow = t => {
			const id = userInfo.value.userId;
			followUser(id, t).then(() => {
				if (t) {
					message({ type: 'success', message: '关注成功！' });
					userInfo.value.followed = true;
				} else {
					message({ type: 'success', message: '取消关注成功！' });
					userInfo.value.followed = false;
				}
			});
		};
		onMounted(() => {
			watch(
				() => route.query.id,
				newVal => {
					if (!newVal) return;
					getUserDetail(newVal).then(result => {
						bindings.value = result.data.bindings;
						userInfo.value = result.data.profile;
						identify.value = result.data.identify;
						level.value = result.data.level;
					});
				},
				{ immediate: true }
			);
		});
		return {
			level,
			userInfo,
			identify,
			follow,
			userId: computed(() => store.getters['user/userId']),
		};
	},
};
</script>

<style lang="less" scoped>
.user-description {
	.description {
		display: flex;
		> img {
			width: 11rem;
			height: 11rem;
			object-fit: cover;
			border-radius: 50%;
		}
		.info {
			display: flex;
			flex-direction: column;
			margin-left: 2rem;
			> div {
				margin: 0.2rem 0;
			}
			span {
				font-size: 0.9rem;
			}
			.nickname {
				display: flex;
				align-items: center;
				.userName {
					margin: 0 1rem;
					font-size: 1.5rem;
				}
				.gender {
					> i {
						font-size: 1.5rem;
					}
					.icon-boy {
						color: #26a6e4;
					}
					.icon-girl {
						color: #ffb8d5;
					}
				}
				> i {
					display: block;
					background-color: #fff;
					font-size: 0.9rem;
					text-align: center;
					border-radius: 0.75rem;
					padding: 0 1rem;
					border: 2px solid #f0483b;
					color: #f0483b;
				}
			}
			.identify {
				display: flex;
				span {
					font-size: 0.85rem;
					height: 1.5rem;
					line-height: 1.5rem;
				}
				> div {
					display: flex;
					align-items: center;
					width: 5rem;
					height: 1.5rem;
					background-color: #f0483b;
					border-radius: 0.75rem;
					margin-right: 0.5rem;
					img {
						height: 1.5rem;
						vertical-align: middle;
					}
					span {
						padding-left: 0.5rem;
						color: #fff;
					}
				}
			}
			.follow {
				display: flex;
				span {
					margin-right: 1rem;
				}
			}
			.signature {
				span {
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
			.utils {
				ul {
					display: flex;
					li {
						margin-right: 1rem;
						a {
							display: block;
							padding: 0.5rem 2rem;
							background-color: #e3e3e3;
							color: #000;
							border-radius: 5rem;
							font-size: 0.9rem;
							.icon-xihuan2 {
								color: #ff6664;
							}
						}
						i {
							padding: 0 5px;
						}
						.active {
							background-color: #1ecf9e;
							color: #fff;
						}
					}
				}
			}
		}
	}
}
</style>
