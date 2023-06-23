<template>
	<div class="app-login-wrapper">
		<div class="app-login">
			<div class="login-content">
				<div class="login-header">
					<a href="javascript:;" title="关闭" @click="off"><i class="iconfont icon-cuo"></i></a>
				</div>
				<div class="login-body">
					<p class="title">扫码登录</p>
					<div class="qr">
						<div class="content">
							<img :src="qrimg || none" alt="" />
							<template v-if="isShowState">
								<div class="success mask" v-if="status">
									<i class="iconfont icon-success"></i>
									<p>扫码成功！</p>
									<p>请在客户端确认</p>
								</div>
								<div class="lose mask" v-else>
									<i class="iconfont icon-error"></i>
									<p>二维码失效</p>
									<a href="javascript:;" @click="createQRkey">重新获取</a>
								</div>
							</template>
						</div>
					</div>
					<p class="tips">
						使用<a href="https://music.163.com/#/download"> 网易云音乐APP </a>扫码登录
					</p>
				</div>
				<div class="login-footer">
					<a href="javascript:;" @click="other">
						<p>选择其它登录模式<i class="iconfont icon-xiangyoujiantou"></i></p>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { QRkey, QRbase, QRstate } from '@/api/login';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { setCookie, removeCookie } from '@/utils/cookie';
import { useStore } from 'vuex';
import messageBox from '@/utils/message-box';
import none from '../assets/images/song_300.png';
import message from '@/utils/message';
export default {
	name: 'AppLogin',
	setup() {
		const store = useStore();
		const qrimg = ref(null);
		const key = ref(null);
		const timer = ref(null);
		const isShowState = ref(false);
		const status = ref(true);
		// 获取用户状态
		const getUserStatus = async () => {
			try {
				const result = await store.dispatch('user/userStatus');
				store.dispatch('user/userInfo', result);
				// 获取用户喜欢歌曲
				store.dispatch('user/userLike', result);
				store.commit('user/changPanelStatus', false); // 关闭面板
				message({ type: 'success', message: '登录成功！' });
			} catch (err) {
				messageBox({
					title: '提示',
					message: '获取用户信息失败，请刷新页面重试！',
					isShowCancel: true,
				});
			}
		};
		// 生成二维码
		const createQRkey = () => {
			isShowState.value = false;
			status.value = true;
			QRkey()
				.then(data => {
					return Promise.resolve(data.data.data.unikey);
				})
				.then(data => {
					key.value = data;
					QRbase(data).then(data => {
						qrimg.value = data.data.data.qrimg;
					});
				});
		};
		// 查询登录状态
		const loginStatus = key => {
			QRstate(key).then(data => {
				const code = data.data.code;
				// 二维码失效
				if (code === 800) {
					clearInterval(timer.value);
					isShowState.value = true;
					status.value = false;
				}
				// 扫码成功
				if (code === 802) {
					isShowState.value = true;
					status.value = true;
				}
				// 授权成功
				if (code === 803) {
					clearInterval(timer.value);
					removeCookie(); // 删除旧cookie
					setCookie(data.data.cookie, 1); // 存储新cookie
					// 查询用户状态
					getUserStatus();
				}
			});
		};
		const other = () => {
			message({ type: 'warn', message: '当前仅支持扫码登录，给您带来不便，敬请谅解' });
		};
		const off = () => store.commit('user/changPanelStatus', false);
		onMounted(() => {
			createQRkey();
			// 监视key值变化
			watch(
				key,
				newVal => {
					if (newVal) {
						timer.value = setInterval(() => loginStatus(newVal), 3000);
					}
				},
				{ immediate: true }
			);
		});
		onUnmounted(() => clearInterval(timer.value));
		return {
			qrimg,
			none,
			isShowState,
			status,
			other,
			createQRkey,
			off,
		};
	},
};
</script>

<style lang="less" scoped>
.app-login-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 999;
	.app-login {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--global-bg2);
		border-radius: 1rem;
		.login-content {
			display: flex;
			flex-direction: column;
			padding: 0 2rem;
			width: 20rem;
			height: 30rem;
			.login-header {
				flex: 1;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				i {
					font-size: 1.5rem;
				}
			}
			.login-body {
				flex: 5;
				display: flex;
				flex-direction: column;
				.qr {
					flex: 1;
					position: relative;
					.content {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 10rem;
						height: 10rem;
						.mask {
							position: absolute;
							top: 0;
							left: 0;
							background-color: rgba(255, 255, 255, 0.9);
							width: 100%;
							height: 100%;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							a {
								display: block;
								width: 7rem;
								height: 2rem;
								line-height: 2rem;
								background-color: #f92f40;
								border-radius: 0.2rem;
								text-align: center;
								color: #fff;
								font-size: 0.9rem;
							}
							p {
								font-size: 1rem;
							}
							i {
								font-size: 3rem;
							}
							.icon-success {
								color: #1ecc94;
							}
							.icon-error {
								color: #f92f40;
							}
						}
					}
				}
				p {
					text-align: center;
					a {
						color: red;
					}
				}
				.tips {
					font-size: 0.9rem;
				}
				.title {
					font-weight: bold;
					font-size: 1.5rem;
				}
			}
			.login-footer {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				a {
					p {
						font-size: 0.9rem;
						i {
							font-size: 0.8rem;
						}
					}
				}
			}
		}
	}
}
</style>
