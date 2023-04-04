<template>
	<div class="picked-exclusive">
		<div class="exclusive">
			<MusicTitleChild title="独家放送" />
			<ul>
				<li v-for="item in exclusive" :key="item.id">
					<a href="javascript:;">
						<img :src="item.picUrl" alt="" />
						<AppMask />
					</a>
					<div class="ellipsis">{{ item.name }}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import AppMask from '@/components/app-mask';
import MusicTitleChild from '@/components/library/music-title-child';
import { getExclusiveBroadcast } from '@/api/music';
import { shallowRef } from 'vue';
export default {
	name: 'PickedEllipsis',
	components: { AppMask, MusicTitleChild },
	setup() {
		const exclusive = shallowRef([]);
		getExclusiveBroadcast().then(data => {
			exclusive.value = data.data.result;
		});
		return { exclusive };
	},
};
</script>

<style lang="less" scoped>
.exclusive {
	ul {
		display: flex;
		li {
			padding-right: 1rem;
			width: 33.33%;
			flex-shrink: 0;
			a {
				display: block;
				position: relative;
				transition: transform 0.3s;
				img {
					border-radius: 0.5rem;
				}
				&:hover {
					transform: translateY(-0.3rem);
				}
			}
			div {
				width: 100%;
				font-size: 0.8rem;
				padding: 0.3rem 0;
			}
		}
	}
}
</style>
