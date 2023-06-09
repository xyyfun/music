<template>
	<div class="app-header">
		<div class="header-content">
			<!-- 工具 -->
			<div class="tool">
				<!-- 历史/前进/后退 -->
				<div class="history">
					<a href="javascript:;" @click="$router.back()" title="后退">
						<i class="iconfont icon-xiangzuojiantou"> </i>
					</a>
					<a href="javascript:;" @click="$router.forward()" title="前进">
						<i class="iconfont icon-xiangyoujiantou"></i>
					</a>
				</div>
				<!-- 搜索 -->
				<AppSearchBox />
			</div>
			<!-- 菜单 -->
			<div class="menu">
				<div class="picture">
					<img v-lazy="userAvatarUrl" class="avatarUrl" alt="" />
					<router-link :to="`/user?id=${userId}`" v-if="userId">{{ userName }}</router-link>
					<a
						href="javascript:;"
						@click="$store.commit('user/changPanelStatus', true)"
						class="info"
						v-else
						>请登录</a
					>
					<img v-lazy="vipIcons" class="member" v-if="userId" alt="" />
				</div>
				<a href="javascript:;" @click="toggleDark()">
					<div class="switch">
						<div class="block" :class="isDark ? 'dark' : 'light'">
							<i class="iconfont" :class="isDark ? 'icon-moon' : 'icon-sun'"></i>
						</div>
					</div>
				</a>
				<a href="javascript:;" class="more">
					<i class="iconfont icon-caidan" @click="showMore"></i>
					<transition name="fade-header">
						<div class="more-box" v-show="isShowMore" ref="moreBox">
							<ul>
								<li>
									<router-link :to="`/user?id=${userId}`" @click="isShowMore = false">
										<i class="iconfont icon-user"></i>
										<span>用户主页</span>
									</router-link>
								</li>
								<li>
									<router-link :to="`/message`" @click="isShowMore = false">
										<i class="iconfont icon-message"></i>
										<span>我的信息</span>
									</router-link>
								</li>
								<li>
									<a href="javascript:;">
										<i class="iconfont icon-member"></i>
										<span>我的等级</span>
									</a>
								</li>
								<li>
									<a href="javascript:;">
										<i class="iconfont icon-set"></i>
										<span>个人设置</span>
									</a>
								</li>
								<li>
									<a href="javascript:;">
										<i class="iconfont icon-safety"></i>
										<span>实名认证</span>
									</a>
								</li>
								<li @click="loginOut">
									<a href="javascript:;">
										<i class="iconfont icon-exit"></i>
										<span>退出登录</span>
									</a>
								</li>
							</ul>
						</div>
					</transition>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import AppSearchBox from '@/components/app-search-box';
import { removeCookie } from '@/utils/cookie';
import { removeUserInfo } from '@/utils/user';
import { useStore } from 'vuex';
import { logout } from '@/api/login';
import { onClickOutside, useDark, useToggle } from '@vueuse/core';
import { ref, computed } from 'vue';
import messageBox from '@/utils/message-box';
import message from '@/utils/message';
export default {
	name: 'AppHeader',
	components: { AppSearchBox },
	setup() {
		const store = useStore();
		const moreBox = ref(null);
		const isShowMore = ref(false);
		const status = computed(() => store.state.user.status);
		const isDark = useDark();
		const vipIcons = computed(() => {
			return store.state.user.userVIPinfo.dynamicIconUrl || store.state.user.userVIPinfo.iconUrl;
		});
		// 登出
		const loginOut = () => {
			messageBox({
				title: '提示',
				message: '退出后保存的数据无法找回，确认退出吗？',
				isShowCancel: true,
			})
				.then(() => {
					logout().then(() => {
						removeCookie(); // 移除cookie
						removeUserInfo(); // 移除持久化用户信息
						store.commit('user/removeInfo'); // 移除vuex信息
						store.dispatch('user/userStatus');
						message({ type: 'success', message: '退出成功！' });
					});
				})
				.catch(() => message({ message: '已取消！' }));
		};
		// 深色/浅色
		const toggleDark = useToggle(isDark);
		// 显示更多
		const showMore = () => {
			if (status.value === 2) {
				isShowMore.value = true;
			} else {
				message({ type: 'warn', message: '登录后使用更多功能！' });
			}
		};
		onClickOutside(moreBox, () => (isShowMore.value = false));
		return {
			moreBox,
			isShowMore,
			status,
			isDark,
			vipIcons,
			loginOut,
			showMore,
			toggleDark,
			userId: computed(() => store.getters['user/userId']),
			userAvatarUrl: computed(() => store.getters['user/userAvatarUrl']),
			userName: computed(() => store.getters['user/userName']),
		};
	},
};
</script>

<style lang="less" scoped>
.app-header {
	width: 100%;
	height: 5rem;
	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 1.78rem;
		> div {
			height: 2rem;
			line-height: 2rem;
		}
		.tool {
			display: flex;
			.history {
				i {
					padding: 0 0.7rem;
					font-size: 1rem;
				}
			}
		}
		.menu {
			display: flex;
			align-items: center;
			.picture {
				display: flex;
				align-items: center;
				img {
					object-fit: cover;
				}
				.avatarUrl {
					width: 2rem;
					height: 2rem;
					border-radius: 50%;
				}
				.member {
					width: 2.63rem;
					height: 1rem;
				}
				a {
					margin: 0 0.5rem;
					font-size: 1rem;
				}
			}
			.switch {
				display: flex;
				align-items: center;
				width: 2.5rem;
				height: 1.4rem;
				border-radius: 0.7rem;
				background-color: var(--global-bg7);
				border: 1px solid var(--global-border3);
				.block {
					position: relative;
					width: 1.1rem;
					height: 1.1rem;
					border-radius: 50%;
					background-color: var(--global-bg);
					transition: transform 0.3s;
					i {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						color: var(--text-default-color);
					}
				}
				.light {
					transform: translateX(5%);
				}
				.dark {
					transform: translateX(110%);
				}
			}
			.more {
				position: relative;
				.more-box {
					position: absolute;
					top: 3rem;
					right: -1rem;
					width: 8rem;
					background-color: var(--global-bg2);
					border-radius: 0.3rem;
					padding: 0.5rem;
					z-index: 12;
					filter: drop-shadow(0 0 10px var(--shadow-black));
					&::before {
						position: absolute;
						top: -0.3rem;
						right: 1rem;
						transform: rotate(45deg);
						content: '';
						width: 1rem;
						height: 1rem;
						background-color: var(--global-bg2);
						z-index: -1;
					}
					ul {
						display: flex;
						flex-direction: column;
						align-items: center;
						li {
							border-radius: 0.3rem;
							padding: 0 0.5rem;
							transition: all 0.2s;
							&:hover {
								background-color: var(--global-bg7);
							}
							a {
								font-size: 0.9rem;
								i {
									margin-right: 0.2rem;
								}
							}
						}
					}
				}
			}
			> a {
				margin: 0 0.5rem;
				font-size: 1rem;
				i {
					font-size: 1rem;
				}
			}
		}
	}
}
</style>
