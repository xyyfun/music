<template>
	<div class="login-footer">
		<div class="device">
			<ul>
				<li>
					<a href="javascript:;">
						<i class="iconfont icon-iphone"></i>
						<span>iPhone</span>
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<i class="iconfont icon-ipad"></i>
						<span>iPad</span>
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<i class="iconfont icon-android"></i>
						<span>Android</span>
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<i class="iconfont icon-windows"></i>
						<span>Windows</span>
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<i class="iconfont icon-mac"></i>
						<span>Mac</span>
					</a>
				</li>
			</ul>
		</div>
		<div class="copyright">
			<p>
				<a href="http://www.tencent.com/" target="_blank" title="关于腾讯">关于腾讯</a>
				<a href="http://www.tencent.com/index_e.shtml" target="_blank" title="About Tencent">
					About Tencent
				</a>
				<a href="http://www.qq.com/contract.shtml" target="_blank" title="服务条款">服务条款</a>
				<a
					href="http://y.qq.com/y/static/tips/service_tips.html"
					target="_blank"
					title="用户服务协议">
					用户服务协议
				</a>
				<a href="https://y.qq.com/m/client/intro/privacy.html" target="_blank" title="隐私政策">
					隐私政策
				</a>
				<a href="https://y.qq.com/vip/right_declare/index.html" target="_blank" title="权利声明">
					权利声明
				</a>
				<a href="http://www.tencentmind.com/" target="_blank" title="广告服务">广告服务</a>
				<a href="http://hr.tencent.com/" target="_blank" title="腾讯招聘">腾讯招聘</a>
				<a href="https://y.qq.com/m/client/helper/pc.html" target="_blank" title="客服中心">
					客服中心
				</a>
				<a href="http://www.qq.com/map/" target="_blank" title="网站导航">网站导航</a>
				<a title="举报中心">举报中心</a>
			</p>
			<p>
				Copyright © 1998 - 2023 Tencent.
				<a
					target="_blank"
					href="http://www.tencent.com/en-us/le/copyrightstatement.shtml"
					title="All Rights Reserved."
					>All Rights Reserved.</a
				>
			</p>
			<p>
				腾讯公司
				<a
					target="_blank"
					href="http://www.tencent.com/zh-cn/le/copyrightstatement.shtml"
					title="版权所有"
					>版权所有</a
				><a
					target="_blank"
					href="https://y.qq.com/music/common/upload/t_cm3_photo_publish/4055034.jpg"
					title="营业执照"
					>营业执照</a
				>网络文化经营许可证：<a
					target="_blank"
					href="https://y.qq.com/music/common/upload/t_cm3_photo_publish/4043272.jpg"
					title="粤网文[2020]3396-195号"
					>粤网文[2020]3396-195号</a
				>客服电话：<a href="tel:4006016666" title="客服电话">4006016666</a
				>违法与不良信息举报邮箱：<a
					href="mailto:tme_musicjubao@tencentmusic.com"
					title="违法与不良信息举报邮箱"
					>tme_musicjubao@tencentmusic.com</a
				>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LoginFooter',
};
</script>

<style lang="less" scoped>
.login-footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	.device {
		ul {
			display: flex;
			li {
				margin: 0 1rem;
				a {
					display: flex;
					flex-direction: column;
					color: #fff;
					i {
						font-size: 2rem;
						text-align: center;
					}
					span {
						font-size: 0.9rem;
					}
				}
			}
		}
	}
	.copyright {
		padding: 2rem 0;
		p {
			text-align: center;
			color: #fff;
			font-size: 0.9rem;
			a {
				color: #fff;
				&::after {
					content: ' | ';
				}
				&:last-child {
					&::after {
						display: none;
					}
				}
			}
		}
	}
}
</style>
