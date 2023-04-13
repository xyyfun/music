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
				<div class="picture"><img :src="userAvatarUrl" alt="" /></div>
				<a href="javascript:;" v-if="userId">{{ userName }}</a>
				<router-link to="/login" class="info" v-else>请登录</router-link>
				<a href="javascript:;" @click="loginOut">退出登录</a>
				<a href="javascript:;" class="skin"><i class="iconfont icon-pifu"></i></a>
				<a href="javascript:;" class="more"><i class="iconfont icon-caidan"></i></a>
			</div>
		</div>
	</div>
</template>

<script>
import AppSearchBox from '@/components/app-search-box';
import { removeCookie } from '@/utils/cookie';
import { removeUserInfo } from '@/utils/userInfo';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { logout } from '@/api/login';
import { computed } from 'vue';
export default {
	name: 'AppHeader',
	components: { AppSearchBox },
	setup() {
		const store = useStore();
		const router = useRouter();
		// 登出
		const loginOut = () => {
			logout().then(() => {
				removeCookie(); // 移除cookie
				removeUserInfo(); // 移除持久化用户信息
				store.commit('user/removeInfo'); // 移除vuex信息
				router.push('/login');
			});
		};
		return {
			loginOut,
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
			.picture {
				overflow: hidden;
				width: 2rem;
				height: 2rem;
				// background-color: #c0c4cc;
				border-radius: 50%;
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
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
