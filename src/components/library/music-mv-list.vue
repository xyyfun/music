<template>
	<div class="music-mv-list">
		<div class="mv-list">
			<div class="item" v-for="item in lists" :key="item.id">
				<router-link :to="`/player?vid=${item.id}&type=mv`">
					<img v-lazy="item.cover + '?param=268y146'" alt="" />
					<AppMask />
				</router-link>
				<span>{{ item.name }}</span>
				<span v-if="isShowSinger">
					<router-link :to="`/singer/${value.id}`" v-for="value in item.artists" :key="value.id">
						{{ value.name }}
					</router-link>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import AppMask from '@/components/app-mask';
export default {
	name: 'MusicMvList',
	components: { AppMask },
	props: {
		lists: {
			type: Array,
			default: () => [],
		},
		isShowSinger: {
			type: Boolean,
			default: true,
		},
	},
};
</script>

<style lang="less" scoped>
.music-mv-list {
	.mv-list {
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
				&:last-child a {
					color: var(--text-default2-a-color);
				}
				a {
					&::after {
						content: ' / ';
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
}
// 屏幕大于 1024px
@media screen and (max-width: 1024px) {
	.mv-list {
		grid-template-columns: repeat(3, 1fr);
	}
}
@media screen and (min-width: 1024px) {
	.mv-list {
		grid-template-columns: repeat(4, 1fr);
	}
}
@media screen and (min-width: 1280px) {
	.mv-list {
		grid-template-columns: repeat(5, 1fr);
	}
}
</style>
