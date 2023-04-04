<template>
	<ul>
		<li v-for="item in dataList" :key="item.id">
			<router-link :to="`${params}/${item.id}`" :title="item.name">
				<div class="img">
					<img v-lazy="item.picUrl + '?param=130y130'" alt="" />
					<AppMask />
					<MusicPlayCount :playCount="item.playCount" />
				</div>
			</router-link>
			<span class="description ellipsis">{{ item.name }}</span>
		</li>
	</ul>
</template>

<script>
import AppMask from '@/components/app-mask';
import MusicPlayCount from '@/components/library/music-play-count';
export default {
	name: 'MusicList',
	props: {
		dataList: {
			type: Array,
			default: () => [],
		},
		params: {
			type: String,
			default: '',
		},
	},
	components: { AppMask, MusicPlayCount },
};
</script>

<style lang="less" scoped>
ul {
	display: grid;
	gap: 0.8rem;
	li {
		.img {
			position: relative;
			transition: transform 0.3s;
			> img {
				border-radius: 0.5rem;
			}
			&:hover {
				transform: translateY(-0.3rem);
			}
			&:hover > .plays-number {
				display: none;
			}
		}
		.description {
			display: block;
			font-size: 0.8rem;
			height: 1.5rem;
			line-height: 1.5rem;
		}
	}
}
@media screen and (max-width: 1024px) {
	ul {
		grid-template-columns: repeat(6, minmax(0, 1fr));
	}
}
@media screen and (min-width: 1024px) {
	ul {
		grid-template-columns: repeat(6, minmax(0, 1fr));
	}
}
@media screen and (min-width: 1280px) {
	ul {
		grid-template-columns: repeat(8, minmax(0, 1fr));
	}
}
@media screen and (min-width: 1536px) {
	ul {
		grid-template-columns: repeat(10, minmax(0, 1fr));
	}
}
</style>
