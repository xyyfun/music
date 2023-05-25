<template>
	<div class="radio-anchor">
		<div class="anchor">
			<MusicTitleChild title="人气主播" />
			<ul>
				<li v-for="item in lists" :key="item.id">
					<router-link :to="`/user?id=${item.id}`" :title="item.nickName">
						<img v-lazy="item.avatarUrl + '?param=200y200'" alt="" />
					</router-link>
					<span class="ellipsis">{{ item.nickName }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import { getRadioAnchor } from '@/api/music';
import { shallowRef } from 'vue';
export default {
	name: 'RadioAnchor',
	components: { MusicTitleChild },
	setup() {
		const lists = shallowRef([]);
		getRadioAnchor().then(data => {
			lists.value = data.data.data.list;
		});
		return { lists };
	},
};
</script>

<style lang="less" scoped>
.anchor {
	ul {
		display: grid;
		gap: 1.25rem;
		li {
			display: flex;
			flex-direction: column;
			align-items: center;
			a {
				display: block;
				width: 100%;
				height: 100%;
				img {
					width: 100%;
					border-radius: 50%;
				}
			}
			span {
				display: block;
				max-width: 100%;
				font-size: 0.9rem;
			}
		}
	}
	@media screen and (max-width: 1280px) {
		ul {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
	}
	@media screen and (min-width: 1280px) {
		ul {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
	}
	@media screen and (min-width: 1440px) {
		ul {
			grid-template-columns: repeat(8, minmax(0, 1fr));
		}
	}
	@media screen and (min-width: 1536px) {
		ul {
			grid-template-columns: repeat(10, minmax(0, 1fr));
		}
	}
}
</style>
