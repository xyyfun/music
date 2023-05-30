<template>
	<div class="singer-filters">
		<div class="filters">
			<ul>
				<li class="list" v-for="(list, index) in lists" :key="index">
					<span>{{ list.name }}</span>
					<ul>
						<li
							class="item"
							v-for="item in list.items"
							:key="item.id"
							@click="changParams(item.id, index, item.name)">
							<a :class="{ active: list.id === item.id }" href="javascript:;">{{ item.name }}</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
export default {
	name: 'SingerFilters',
	emits: ['handlerParams'],
	setup(props, { emit }) {
		const lists = ref([
			{
				name: '语种',
				items: [
					{ name: '全部', id: -1 },
					{ name: '华语', id: 7 },
					{ name: '日本', id: 8 },
					{ name: '欧美', id: 96 },
					{ name: '韩国', id: 16 },
					{ name: '其它', id: 0 },
				],
				id: -1,
			},
			{
				name: '分类',
				items: [
					{ name: '全部', id: -1 },
					{ name: '男歌手', id: 1 },
					{ name: '女歌手', id: 2 },
					{ name: '乐队组合', id: 3 },
				],
				id: -1,
			},
			{
				name: '筛选',
				items: [
					{ name: '热门', id: -1 },
					{ name: 'A', id: 1 },
					{ name: 'B', id: 3 },
					{ name: 'C', id: 4 },
					{ name: 'D', id: 5 },
					{ name: 'E', id: 6 },
					{ name: 'F', id: 7 },
					{ name: 'G', id: 8 },
					{ name: 'H', id: 9 },
					{ name: 'I', id: 10 },
					{ name: 'J', id: 11 },
					{ name: 'K', id: 12 },
					{ name: 'L', id: 13 },
					{ name: 'M', id: 14 },
					{ name: 'N', id: 15 },
					{ name: 'O', id: 16 },
					{ name: 'P', id: 17 },
					{ name: 'Q', id: 18 },
					{ name: 'R', id: 19 },
					{ name: 'S', id: 20 },
					{ name: 'T', id: 21 },
					{ name: 'U', id: 22 },
					{ name: 'V', id: 23 },
					{ name: 'W', id: 24 },
					{ name: 'X', id: 25 },
					{ name: 'Y', id: 26 },
					{ name: 'Z', id: 27 },
					{ name: '#', id: 28 },
				],
				id: -1,
			},
		]);
		const changParams = (id, indx, name) => {
			lists.value[indx].id = id;
			if (indx === 0) {
				emit('handlerParams', 'area', id);
			} else if (indx === 1) {
				emit('handlerParams', 'type', id);
			} else if (indx === 2) {
				if (name == '热门') name = -1;
				emit('handlerParams', 'initial', name);
			}
		};
		return { lists, changParams };
	},
};
</script>

<style lang="less" scoped>
.filters {
	> ul {
		display: flex;
		flex-direction: column;
		> li {
			display: flex;
			font-size: 0.8rem;
			margin-top: 1rem;
			span {
				padding-right: 1rem;
				color: var(--text-desc-color);
			}
			> ul {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				li {
					a {
						padding: 0.2rem 1rem;
						&:hover {
							color: var(--theme-color);
						}
					}
				}
				.active {
					background-color: var(--theme-color);
					border-radius: 0.2rem;
					color: var(--text-default4-color);
					&:hover {
						color: var(--text-default4-color);
					}
				}
			}
		}
	}
}
</style>
