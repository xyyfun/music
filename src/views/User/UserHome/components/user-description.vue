<template>
	<div class="user-description">
		<div class="description" v-if="userInfo.userId">
			<img v-lazy="userInfo.avatarUrl + '?param=300y300'" alt="" />
			<div class="info">
				<div class="nickname">
					<span class="userName">{{ userInfo.nickname }}</span>
				</div>
				<div class="message_info">
					<img :src="vipIcons" alt="" v-if="userInfo.userId === userId" />
					<i>Lv.{{ level }}</i>
					<span class="gender" v-if="userInfo.gender">
						<i class="iconfont icon-boy" v-if="userInfo.gender === 1"></i>
						<i class="iconfont icon-girl" v-else></i>
					</span>
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
				<div class="utils" v-if="userInfo.userId !== userId">
					<ul>
						<li>
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
		const vipIcons = computed(() => {
			return store.state.user.userVIPinfo.dynamicIconUrl || store.state.user.userVIPinfo.iconUrl;
		});
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
			vipIcons,
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
				.userName {
					font-size: 1.5rem;
				}
			}
			.message_info {
				display: flex;
				align-items: center;
				img {
					width: 3.8rem;
					height: 1.5rem;
					margin-right: 0.5rem;
				}
				.gender {
					> i {
						font-size: 1.5rem;
					}
					.icon-boy {
						color: var(--gender-boy);
					}
					.icon-girl {
						color: var(--gender-girl);
					}
				}
				> i {
					display: block;
					background-color: var(--global-bg2);
					font-size: 0.9rem;
					text-align: center;
					border-radius: 0.75rem;
					padding: 0 1rem;
					border: 2px solid #f0483b;
					color: #f0483b;
					margin-right: 0.5rem;
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
						color: var(--text-default4-color);
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
							background-color: var(--global-bg3);
							color: var(--text-default-color);
							border-radius: 5rem;
							font-size: 0.9rem;
							.icon-xihuan2 {
								color: var(--theme-color-like);
							}
						}
						i {
							padding: 0 5px;
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
