<template>
	<div class="login-form">
		<div class="title">
			<p>扫码登录</p>
			<span>使用QQ音乐APP扫码登陆</span>
		</div>
		<div class="picture" v-if="!isShowState">
			<img :src="qrimg || none" alt="" />
		</div>
		<div class="state" v-else>
			<i class="iconfont" :class="state ? 'icon-success' : 'icon-error'"></i>
			<span>{{ stateInfo }}</span>
		</div>
	</div>
</template>

<script>
import { QRkey, QRbase, QRstate } from '@/api/login';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { setCookie, removeCookie } from '@/utils/cookie';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import none from '../../../assets/images/song_300.png';
import message from '@/utils/message';
import messageBox from '@/utils/message-box';
export default {
	name: 'LoginForm',
	setup() {
		const store = useStore();
		const router = useRouter();
		const qrimg = ref(null);
		const key = ref(null);
		const timer = ref(null);
		const isShowState = ref(false);
		const state = ref(true);
		const stateInfo = ref(null);
		// 获取用户状态
		const getUserStatus = async () => {
			try {
				const result = await store.dispatch('user/userStatus');
				store.dispatch('user/userInfo', result);
				// 获取用户喜欢歌曲
				store.dispatch('user/userLike', result);
				router.replace('/');
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
				if (code === 800) {
					clearInterval(timer.value);
					isShowState.value = true;
					state.value = false;
					stateInfo.value = '二维码不存在或已过期，请重新获取';
				}
				if (code === 802) {
					isShowState.value = true;
					state.value = true;
					stateInfo.value = '扫码成功，请在客户端确认是否登录';
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
		return { qrimg, none, isShowState, state, stateInfo };
	},
};
</script>

<style lang="less" scoped>
.login-form {
	align-self: center;
	display: flex;
	flex-direction: column;
	width: 28rem;
	height: 20rem;
	padding: 1rem;
	background-color: rgba(255, 255, 255, 0.4);
	backdrop-filter: blur(10px);
	border-radius: 0.5rem;
	.title {
		text-align: center;
		p {
			font-size: 1.5rem;
		}
		span {
			font-size: 1rem;
		}
	}
	.picture {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 10rem;
			height: 10rem;
		}
	}
	.state {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		span {
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
</style>
