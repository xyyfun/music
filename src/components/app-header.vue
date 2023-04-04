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
				<div class="search">
					<input type="text" />
				</div>
			</div>
			<!-- 菜单 -->
			<div class="menu">
				<div class="picture"></div>
				<a href="javascript:;" class="info">请登录</a>
				<a href="javascript:;" class="skin"><i class="iconfont icon-pifu"></i></a>
				<a href="javascript:;" class="more"><i class="iconfont icon-caidan"></i></a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppHeader',
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
			.search {
				> input {
					outline: none;
					height: 2rem;
					width: 20rem;
					border: none;
					border-radius: 1rem;
					background-color: #e3e3e3;
					text-indent: 0.7rem;
				}
			}
		}
		.menu {
			display: flex;
			.picture {
				width: 2rem;
				height: 2rem;
				background-color: #c0c4cc;
				border-radius: 50%;
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
