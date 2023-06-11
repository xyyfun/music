<template>
	<div class="app-swiper">
		<div class="swiper overflow" @mouseenter="enterSwiper" @mouseleave="leaveSwiper">
			<div
				class="item"
				v-for="(item, index) in banners"
				:key="item.targetId"
				:style="styleTemplate[index].style">
				<a href="javascript:;" @click="routeJump(item.targetType, item.targetId, item.url)">
					<img :src="item.imageUrl + '?param=540y200'" />
					<span :style="{ background: item.titleColor }">{{ item.typeTitle }}</span>
				</a>
			</div>
			<div class="btn-prev" @click="prev">
				<a href="javascript:;"><i class="iconfont icon-xiangzuojiantou"></i></a>
			</div>
			<div class="btn-next" @click="next">
				<a href="javascript:;"><i class="iconfont icon-xiangyoujiantou"></i></a>
			</div>
		</div>
	</div>
</template>

<script>
import { getBanner } from '@/api/discover';
import { onMounted, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
	name: 'AppBanner',
	setup() {
		const store = useStore();
		const router = useRouter();
		const banners = ref([]);
		const timer = ref(null);
		const isShowBtn = ref(false);
		const styleTemplate = ref([
			{
				style: {
					'z-index': 1,
					transform: 'translateX(-100%) scale(0.63)',
				},
			},
			{
				style: {
					'z-index': 3,
					transform: 'translateX(-55%) scale(0.8)',
				},
			},
			{
				style: {
					'z-index': 4,
					transform: 'translateX(0) scale(1)',
				},
			},
			{
				style: {
					'z-index': 3,
					transform: 'translateX(55%) scale(0.8)',
				},
			},
			{
				style: {
					'z-index': 1,
					transform: 'translateX(100%) scale(0.63)',
				},
			},
		]);
		// 下一页
		const next = () => styleTemplate.value.unshift(styleTemplate.value.pop());
		// 上一页
		const prev = () => styleTemplate.value.push(styleTemplate.value.shift());
		const enterSwiper = () => {
			isShowBtn.value = true;
			clearInterval(timer.value);
			timer.value = null;
		};
		const leaveSwiper = () => {
			isShowBtn.value = false;
			timer.value = setInterval(() => next(), 3000);
		};
		const routeJump = (type, id, url) => {
			if (type === 1) {
				// 新歌首发
				store.commit('song/ISPLAY', false); // 播放前将播放器暂停
				store.dispatch('song/getMusic', id);
			} else if (type === 10) {
				// 新碟首发`
				router.push(`/album/${id}`);
			} else if (type === 1000) {
				// 歌单推荐
				router.push(`/playlist/${id}`);
			} else if (type === 1004) {
				// MV推荐
				router.push(`/player?id=${id}&type=mv`);
			} else if (type === 3000) {
				// 独家策划
				window.open(url);
			}
		};
		onMounted(() => {
			getBanner().then(data => {
				const arr = [];
				for (let i = 0; i < data.data.banners.length - 5; i++) {
					arr.push({ style: { 'z-index': 1, transform: `translateX(0) scale(0.63)` } });
				}
				styleTemplate.value.push(...arr);
				banners.value = data.data.banners;
			});
			timer.value = setInterval(() => next(), 3000); // 开启自动轮播
		});
		onUnmounted(() => {
			clearInterval(timer.value);
			timer.value = null;
		});
		return {
			isShowBtn,
			banners,
			styleTemplate,
			routeJump,
			enterSwiper,
			leaveSwiper,
			next,
			prev,
		};
	},
};
</script>

<style lang="less" scoped>
.app-swiper {
	.swiper {
		display: flex;
		justify-content: center;
		position: relative;
		height: 12.5rem;
		margin: 2rem 0;
		&:hover > div[class^='btn'] {
			opacity: 1;
		}
		.item {
			position: absolute;
			width: 33.75rem;
			height: 100%;
			background-color: var(--global-bg3);
			border-radius: 0.5rem;
			transition: all 0.7s;
			a {
				img {
					height: 100%;
					border-radius: 0.5rem;
				}
				span {
					display: block;
					position: absolute;
					right: 0;
					bottom: 0;
					padding: 0.3rem;
					color: #fff;
					font-size: 0.8rem;
					border-radius: 0.5rem 0;
				}
			}
		}
		div[class^='btn'] {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 2.5rem;
			height: 2.5rem;
			line-height: 2.5rem;
			text-align: center;
			border-radius: 50%;
			z-index: 6;
			background-color: var(--transparent-white);
			transition: all 0.5s;
			opacity: 0;
			&:hover {
				background-color: var(--global-hover2-bg);
			}
			i {
				font-size: 0.85rem;
			}
			a {
				display: block;
			}
		}
		.btn-prev {
			left: 1rem;
		}
		.btn-next {
			right: 1rem;
		}
	}
}
</style>
