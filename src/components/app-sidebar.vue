<template>
	<div class="app-sidebar scroll">
		<div class="sidebar-content">
			<h1 class="logo">
				<router-link to="/" title="QQ音乐" :style="logoStatus">QQ音乐</router-link>
			</h1>
			<div class="menu">
				<span>在线音乐</span>
				<ul>
					<li>
						<router-link to="/" exact-active-class="active">
							<i class="iconfont icon-pinpai"></i>
							<span>推荐</span>
						</router-link>
					</li>
					<li>
						<router-link to="/music" active-class="active">
							<i class="iconfont icon-yinle"></i>
							<span>音乐馆</span>
						</router-link>
					</li>
					<li>
						<router-link to="/video" exact-active-class="active">
							<i class="iconfont icon-shipinsheying"></i>
							<span>视频</span>
						</router-link>
					</li>
					<li>
						<router-link to="/radio" exact-active-class="active">
							<i class="iconfont icon-diantai"></i>
							<span>雷达</span>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="menu">
				<span>我的音乐</span>
				<ul>
					<li>
						<router-link to="/like" exact-active-class="active">
							<i class="iconfont icon-xihuan2"></i>
							<span>我喜欢</span>
						</router-link>
					</li>
					<li>
						<router-link to="/local" exact-active-class="active">
							<i class="iconfont icon-tv-full"></i>
							<span>本地和下载</span>
						</router-link>
					</li>
					<li>
						<router-link to="/recently" exact-active-class="active">
							<i class="iconfont icon-zuijin"></i>
							<span>最近播放</span>
						</router-link>
					</li>
					<li>
						<router-link to="/audition" exact-active-class="active">
							<i class="iconfont icon-list"></i>
							<span>试听列表</span>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="menu" v-if="playlist.length">
				<span>创建的歌单</span>
				<ul>
					<li v-for="item in playlist" :key="item.id">
						<router-link :to="`/playlist/${item.id}`" exact-active-class="active">
							<span>{{ item.name }}</span>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { getUserPlaylist } from '@/api/user';
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useDark } from '@vueuse/core';
import logo_light from '@/assets/images/logo_light.png';
import logo_dark from '@/assets/images/logo_dark.png';
export default {
	name: 'AppSidebar',
	setup() {
		const store = useStore();
		const playlist = ref([]);
		const userLike = ref(null);
		const isDark = useDark();
		const userId = computed(() => store.getters['user/userId']);
		const status = computed(() => store.state.user.status);
		const logoStatus = computed(() => {
			if (isDark.value) {
				return `background-image: url(${logo_dark})`;
			} else {
				return `background-image: url(${logo_light})`;
			}
		});
		onMounted(() => {
			watch(
				[userId, status],
				newVal => {
					if (newVal[0] && newVal[1] === 2) {
						getUserPlaylist(newVal[0]).then(data => {
							playlist.value = data.data.playlist.splice(1);
							store.commit('user/changUsreSongLike', data.data.playlist[0].id);
						});
					}
				},
				{ immediate: true }
			);
		});
		return { userLike, logoStatus, playlist };
	},
};
</script>

<style lang="less" scoped>
.app-sidebar {
	width: 14rem;
	min-width: 14rem;
	background-color: var(--global-sidebar);
	overflow-y: hidden;
	overflow-x: hidden;
	&:hover {
		overflow-y: auto;
	}
	.sidebar-content {
		.logo {
			width: 14rem;
			a {
				display: block;
				height: 5rem;
				width: 100%;
				text-indent: -9999px;
				background: no-repeat center 1.4rem / contain;
				background-size: 7.1rem 1.9rem;
			}
		}
		.menu {
			padding: 1.7rem;
			> span {
				font-size: 1rem;
				color: var(--text-default-color);
			}
			ul {
				li {
					width: 100%;
					height: 2rem;
					line-height: 2rem;
					margin-top: 0.71rem;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					a {
						display: block;
						width: 100%;
						height: 100%;
						border-radius: 0.35rem;
						padding: 0 1.1rem;
						transition: all 0.2s;
						color: var(--text-default-color);
						&:hover {
							background-color: var(--global-hover-bg);
						}
						i {
							font-size: 1.25rem;
							margin-right: 0.28rem;
						}
						span {
							font-size: 1rem;
						}
					}
					.active {
						color: #fff;
						background-image: linear-gradient(45deg, var(--linear-gradient));
					}
				}
			}
		}
	}
}
</style>
