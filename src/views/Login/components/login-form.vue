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
import { QRkey, QRbase, QRstate, loginStatus } from '@/api/login';
import { getUserDetail } from '@/api/user';
import { ref, watch } from 'vue';
import { setCookie, removeCookie } from '@/utils/cookie';
import { setUserInfo } from '@/utils/user';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getUserLike } from '@/api/user';
import { setUserLike } from '@/utils/user';
import none from '../../../assets/images/song_300.png';
import message from '@/utils/message';
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
		// 监视key值变化
		watch(key, newVal => {
			if (newVal) {
				timer.value = setInterval(() => {
					QRstate(newVal).then(data => {
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
							setCookie(data.data.cookie); // 存储新cookie
							// 查询登陆状态
							loginStatus().then(data => {
								if (data.data.data.profile) {
									// 获取用户信息
									getUserDetail(data.data.data.profile.userId).then(data => {
										setUserInfo(data.data.profile); // 持久化存储
										store.commit('user/setInfo', data.data.profile); // 存储至vuex
										router.replace('/');
										message({ type: 'success', message: '登录成功！' });
										// 获取用户喜欢歌曲
										getUserLike(data.data.profile.userId).then(data => {
											setUserLike(data.data.ids);
										});
									});
								}
							});
						}
					});
				}, 3000);
			}
		});
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
