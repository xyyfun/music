<template>
	<ul>
		<li v-for="item in dataList" :key="item.id">
			<a href="javascript:;">
				<div class="img">
					<img v-lazy="item.picUrl || item.coverUrl || item.coverImgUrl" alt="" />
					<AppMask />
				</div>
			</a>
			<div class="description ellipsis">{{ item.name }}</div>
		</li>
	</ul>
</template>

<script>
import AppMask from '@/components/app-mask';
export default {
	name: 'MusicList',
	props: {
		dataList: {
			type: Array,
			default: () => [],
		},
	},
	components: { AppMask },
};
</script>

<style lang="less" scoped>
ul {
	display: flex;
	flex-flow: wrap;
	li {
		flex-shrink: 0;
		padding-right: 0.8rem;
		padding-top: 0.8rem;
		.img {
			position: relative;
			transition: transform 0.3s;
			> img {
				border-radius: 0.5rem;
			}
			&:hover {
				transform: translateY(-0.3rem);
			}
		}
		.description {
			font-size: 0.8rem;
			height: 1.5rem;
			line-height: 1.5rem;
		}
	}
}
// 屏幕小于1024px
@media screen and (max-width: 1024px) {
	li {
		width: 25%;
	}
}
@media screen and (min-width: 1024px) {
	li {
		width: 20%;
	}
}
@media screen and (min-width: 1280px) {
	li {
		width: 15%;
	}
}
@media screen and (min-width: 1536px) {
	li {
		width: 10%;
	}
}
</style>
