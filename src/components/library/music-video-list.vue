<template>
	<div class="music-video-list">
		<div class="video-list">
			<div class="item" v-for="item in videoList" :key="item.vid">
				<router-link :to="`/player?vid=${item.vid}&type=video`">
					<img v-lazy="item.coverUrl + '?param=268y146'" alt="" />
					<AppMask />
				</router-link>
				<span>{{ item.title }}</span>
				<span v-if="item.creator">{{ item.creator.nickname }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import AppMask from '@/components/app-mask';
export default {
	name: 'MusicVideoList',
	components: { AppMask },
	props: {
		videoList: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="less" scoped>
.music-video-list {
	.video-list {
		display: grid;
		gap: 1.25rem;
		.item {
			display: flex;
			flex-direction: column;
			> a {
				overflow: hidden;
				position: relative;
				border-radius: 0.5rem;
				background-color: var(--global-bg6);
				img {
					width: 100%;
					height: 100%;
					max-height: 146px;
					object-fit: contain;
					object-position: center center;
					transition: all 0.4s;
				}
				&:hover > img {
					transform: scale(1.1);
				}
			}
			span {
				font-size: 0.8rem;
				margin-top: 0.5rem;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				&:last-child {
					color: var(--text-default2-a-color);
				}
			}
		}
	}
}
// 屏幕大于 1024px
@media screen and (max-width: 1024px) {
	.video-list {
		grid-template-columns: repeat(3, 1fr);
	}
}
@media screen and (min-width: 1024px) {
	.video-list {
		grid-template-columns: repeat(4, 1fr);
	}
}
@media screen and (min-width: 1280px) {
	.video-list {
		grid-template-columns: repeat(5, 1fr);
	}
}
</style>
