<template>
	<div class="app-swiper">
		<div class="swiper overflow">
			<ul class="scroll">
				<li v-for="item in banners" :key="item.encodeId">
					<a href="javascript:;" :title="item.typeTitle">
						<img :src="item.imageUrl" />
						<div class="mask-white"></div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { getBanner } from '@/api/discover';
import { ref } from 'vue';
export default {
	name: 'AppBanner',
	setup() {
		let banners = ref([]);
		getBanner().then(data => {
			banners.value = data.data.banners;
		});
		return {
			banners,
		};
	},
};
</script>

<style lang="less" scoped>
.app-swiper {
	.swiper {
		width: 100%;
		ul {
			display: flex;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			li {
				flex-shrink: 0;
				padding-right: 1rem;
				scroll-snap-align: start;
				padding-bottom: 0.5rem;
				a {
					display: block;
					position: relative;
					img {
						width: 100%;
						height: 100%;
						border-radius: 0.5rem;
					}
					.mask-white {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						transition: background 0.3s;
					}
					&:hover > .mask-white {
						background-color: rgba(255, 255, 255, 0.3);
					}
				}
			}
		}
		.scroll {
			&::-webkit-scrollbar {
				height: 0.4rem;
			}
		}
	}
	// 屏幕小于1024px
	@media screen and (max-width: 1024px) {
		.swiper {
			li {
				width: 100%;
			}
		}
	}
	@media screen and (min-width: 1024px) {
		.swiper {
			li {
				width: 50%;
			}
		}
	}
	@media screen and (min-width: 1280px) {
		.swiper {
			li {
				width: 33.33%;
			}
		}
	}
	@media screen and (min-width: 1536px) {
		.swiper {
			li {
				width: 25%;
			}
		}
	}
}
</style>
