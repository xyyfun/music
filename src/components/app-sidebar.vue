<template>
	<div class="app-sidebar scroll">
		<div class="sidebar-content">
			<h1 class="logo"><router-link to="/">QQ音乐</router-link></h1>
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
						<router-link to="/hall" exact-active-class="active">
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
						<router-link to="/radar" exact-active-class="active">
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
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppSidebar',
};
</script>

<style lang="less">
.app-sidebar {
	width: 200px;
	background-color: #f0f0f0;
	overflow-y: auto;
	.sidebar-content {
		.logo {
			width: 200px;
			a {
				display: block;
				height: 70px;
				width: 100%;
				text-indent: -9999px;
				background: url(../assets/images/logo.png) no-repeat center 20px / contain;
				background-size: 100px 27px;
			}
		}
		.menu {
			padding: 25px;
			ul {
				li {
					width: 100%;
					height: 30px;
					line-height: 30px;
					margin-top: 10px;
					a {
						display: block;
						width: 100%;
						height: 100%;
						border-radius: 5px;
						padding: 0 16px;
						&:hover {
							background-color: #d8d8d8;
							transition: all 0.2s;
						}
						i {
							font-size: 16px;
							margin-right: 4px;
						}
					}
					.active {
						color: #fff;
						background-image: linear-gradient(45deg, #1fd4ae, #1ecc95);
					}
				}
			}
		}
	}
}
</style>
