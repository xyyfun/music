<template>
	<div class="app-progress">
		<div class="progress-content">
			<!-- 进度条 -->
			<div class="slider">
				<!-- 槽 -->
				<div class="slot">
					<!-- 滑块 -->
					<div class="trigger"></div>
					<!-- 已完成的进度 -->
					<div class="complete"></div>
				</div>
			</div>
			<!-- 歌词信息 -->
			<div class="song-info">
				<div class="info">
					<img src="../assets/images/not-played.png" alt="" />
					<div class="right-info">
						<div class="basic-info">
							<a href="javascript:;">
								<span class="song-name">模特</span>
								<span class="singer"> - 李荣浩</span>
							</a>
						</div>
						<div class="operation">
							<a href="javascript:;" title="喜欢"><i class="iconfont icon-xihuan21"></i></a>
							<a href="javascript:;" title="下载该歌曲"><i class="iconfont icon-xiazai"></i></a>
							<a href="javascript:;" title="更多"><i class="iconfont icon-gengduo"></i></a>
							<a href="javascript:;" title="评论"><i class="iconfont icon-pinglun1"></i></a>
						</div>
					</div>
				</div>
				<div class="control">
					<div class="switching-mode"><i class="iconfont icon-suiji" title="播放顺序"></i></div>
					<div class="switch">
						<i class="iconfont icon-shangyishou" title="上一首"></i>
						<i class="iconfont icon-bofang2" title="播放"></i>
						<i class="iconfont icon-xiayishou" title="下一首"></i>
					</div>
					<div class="volume"><i class="iconfont icon-yinliang" title="音量"></i></div>
				</div>
				<div class="more">
					<span class="time">3:34/4:50</span>
					<a href="javascript:;" title="播放队列">
						<i class="iconfont icon-list"></i>
						<span class="num">999+</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppProgress',
};
</script>

<style lang="less" scoped>
.app-progress {
	width: 100%;
	.progress-content {
		// 进度条
		.slider {
			display: flex;
			align-items: center;
			height: 0.71rem;
			&:hover .slot .trigger {
				opacity: 1;
				transition: all 0.2s;
			}
			.slot {
				position: relative;
				width: 100%;
				height: 2px;
				background-color: #dadada;
				cursor: pointer;
				.trigger {
					opacity: 0;
					position: absolute;
					top: -3px;
					left: (200px-4);
					width: 8px;
					height: 8px;
					background-color: #1ecc94;
					border-radius: 50%;
				}
				.complete {
					width: 200px;
					height: 2px;
					background-color: #1ecc94;
				}
			}
		}
		// 歌曲信息
		.song-info {
			display: flex;
			height: 5rem;
			padding: 0 1.78rem;
			> div {
				flex: 1;
			}
			.info {
				height: 100%;
				display: flex;
				align-items: center;
				img {
					width: 3.1rem;
					height: 3.1rem;
					border-radius: 0.35rem;
				}
				.right-info {
					padding: 0 0.7rem;
					width: 14rem;
					height: 3.1rem;
					.basic-info {
						a {
							font-size: 1rem;
							.singer {
								color: #7b7b7b;
							}
						}
					}
					.operation {
						i {
							font-size: 1rem;
							margin: 0 0.35rem;
							&:hover {
								color: #1ecc94;
							}
						}
					}
				}
			}
			.control {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				i {
					margin: 0 0.35rem;
					font-size: 1rem;
					cursor: pointer;
				}
				.switch {
					i {
						font-size: 2rem;
						&:nth-child(2) {
							color: #1ecc94;
							font-size: 2.2rem;
						}
					}
				}
			}
			.more {
				display: flex;
				height: 100%;
				font-size: 1rem;
				justify-content: right;
				align-items: center;
				> span {
					margin: 0 0.35rem;
					color: #7b7b7b;
				}
				a {
					i {
						font-size: 1.3rem;
					}
					&:hover {
						color: #1ecc94;
					}
				}
			}
		}
	}
}
</style>
