<template>
	<div class="playlist-filters">
		<div class="filters">
			<ul>
				<li
					v-for="item in list"
					:key="item.id"
					:class="{ active: item.id === now }"
					@click="changTitle(item)">
					{{ item.name }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import emitter from '@/utils/bus';
export default {
	name: 'PlaylistFilters',
	setup() {
		const now = ref(1);
		const list = [
			{ id: 1, name: '全部' },
			{ id: 2, name: '华语' },
			{ id: 3, name: '欧美' },
			{ id: 4, name: '韩语' },
			{ id: 5, name: '日语' },
			{ id: 6, name: '粤语' },
			{ id: 7, name: '另类/独立' },
			{ id: 8, name: 'R&B/Soul' },
			{ id: 9, name: '怀旧' },
			{ id: 10, name: '全部' },
			{ id: 11, name: '全部' },
			{ id: 12, name: '全部' },
			{ id: 13, name: '小语种' },
			{ id: 14, name: '学习' },
			{ id: 15, name: '夜晚' },
			{ id: 16, name: '运动' },
			{ id: 17, name: 'ACG' },
			{ id: 18, name: '影视原声' },
			{ id: 19, name: '流行' },
			{ id: 20, name: '性感' },
			{ id: 21, name: '摇滚' },
			{ id: 22, name: '英伦' },
			{ id: 23, name: '后摇' },
			{ id: 24, name: '古风' },
			{ id: 25, name: '民谣' },
			{ id: 26, name: '蓝调' },
			{ id: 27, name: '乡村' },
			{ id: 28, name: '浪漫' },
			{ id: 29, name: '快乐' },
			{ id: 30, name: '世界音乐' },
			{ id: 31, name: '轻音乐' },
			{ id: 32, name: '电子' },
			{ id: 33, name: '器乐' },
			{ id: 34, name: '说唱' },
			{ id: 35, name: '古典' },
			{ id: 36, name: '爵士' },
		];
		const changTitle = ({ id, name }) => {
			now.value = id;
			emitter.emit('changTitle', name);
		};
		return { list, now, changTitle };
	},
};
</script>

<style lang="less" scoped>
.filters {
	ul {
		display: grid;
		gap: 0.625rem;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		li {
			display: flex;
			height: 2rem;
			justify-content: center;
			align-items: center;
			background-color: var(--global-bg3);
			border-radius: 0.3rem;
			font-size: 0.9rem;
			cursor: pointer;
			transition: all 0.3s;
			&:hover {
				color: var(--theme-color);
			}
		}
		.active {
			background-color: var(--theme-color);
			color: var(--text-default4-color);
			&:hover {
				color: var(--text-default4-color);
			}
		}
	}
	@media screen and (max-width: 1280px) {
		ul {
			grid-template-columns: repeat(8, minmax(0, 1fr));
		}
	}
	@media screen and (min-width: 1280px) {
		ul {
			grid-template-columns: repeat(10, minmax(0, 1fr));
		}
	}
	@media screen and (min-width: 1540px) {
		ul {
			grid-template-columns: repeat(12, minmax(0, 1fr));
		}
	}
}
</style>
