<template>
	<div class="radio-banner">
		<div class="banner">
			<ul>
				<li v-for="item in bannerList" :key="item.targetId">
					<a href="javascript:;" :title="item.typeTitle">
						<img v-lazy="item.pic" alt="" />
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { getRadioBanner } from '@/api/music';
import { shallowRef } from 'vue';
export default {
	name: 'RadioBanner',
	setup() {
		const bannerList = shallowRef([]);
		getRadioBanner().then(data => {
			bannerList.value = data.data.data;
		});
		return { bannerList };
	},
};
</script>

<style lang="less" scoped>
.banner {
	ul {
		display: flex;
		li {
			padding-right: 1rem;
			a {
				img {
					border-radius: 0.5rem;
				}
			}
		}
	}
}
</style>
