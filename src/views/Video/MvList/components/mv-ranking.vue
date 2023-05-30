<template>
	<div class="ranking">
		<div class="head">
			<MusicTitleChild title="MV排行" />
			<ul>
				<li
					v-for="item in title"
					:key="item.id"
					:class="{ active: now === item.id }"
					@click="changTitle(item)">
					<a href="javascript:;">{{ item.name }}</a>
				</li>
			</ul>
		</div>
		<div class="lists">
			<div class="item" v-for="(item, index) in lists" :key="item.id">
				<div class="number">
					<p>{{ index + 1 < 10 ? '0' + (index + 1) : index + 1 }}</p>
				</div>
				<div class="image">
					<router-link :to="`/player?id=${item.id}&type=mv`">
						<img v-lazy="item.cover + '?param=211y114'" alt="" />
						<AppMask />
					</router-link>
				</div>
				<div class="info">
					<span class="ellipsis">{{ item.name }}</span>
					<span class="ellipsis">
						<router-link :to="`/singer/${value.id}`" v-for="value in item.artists" :key="value.id">
							{{ value.name }}
						</router-link>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import AppMask from '@/components/app-mask';
import { getMvRanking } from '@/api/video';
import { ref } from 'vue';
export default {
	name: 'MvRanking',
	components: { MusicTitleChild, AppMask },
	setup() {
		const now = ref(1);
		const lists = ref([]);
		const title = [
			{ id: 1, name: '内地' },
			{ id: 2, name: '港台' },
			{ id: 3, name: '欧美' },
			{ id: 4, name: '日本' },
			{ id: 5, name: '韩国' },
		];
		const changTitle = item => {
			now.value = item.id;
			getData(item.name);
		};
		const getData = area => {
			getMvRanking(area).then(data => (lists.value = data.data.data));
		};
		getData();
		return { now, title, changTitle, lists };
	},
};
</script>

<style scoped lang="less">
.ranking {
	.head {
		display: flex;
		justify-content: space-between;
		ul {
			display: flex;
			align-items: center;
			li {
				margin-left: 1rem;
				height: 2rem;
				line-height: 2rem;
				border-radius: 1rem;
				transition: border 0.2s;
				border: 1px solid transparent;
				a {
					padding: 0 1rem;
					font-size: 0.8rem;
				}
				&:hover {
					border-color: var(--theme-color);
				}
			}
			.active {
				background-color: var(--theme-color);
				a {
					color: var(--text-default4-color);
				}
			}
		}
	}
	.lists {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		.item {
			display: flex;
			align-items: center;
			padding: 1rem;
			border-bottom: 1px solid var(--global-border3);
			&:nth-of-type(2n + 1) {
				border-right: 1px solid var(--global-border3);
			}
			&:nth-last-of-type(-n + 2) {
				border-bottom: none;
			}
			.number {
				width: 3rem;
				text-align: center;
				font-size: 1.5rem;
			}
			.image {
				a {
					overflow: hidden;
					display: block;
					position: relative;
					border-radius: 0.5rem;
					img {
						width: 100%;
						height: 100%;
						max-height: 114px;
						object-fit: contain;
						object-position: center center;
						transition: all 0.3s;
					}
					&:hover > img {
						transform: scale(1.1);
					}
				}
			}
			.info {
				display: flex;
				flex-direction: column;
				padding-left: 1rem;
				width: 9rem;
				span,
				a {
					font-size: 0.8rem;
				}
				span {
					margin-top: 0.5rem;
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
</style>
