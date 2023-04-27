<template>
	<div class="tabs">
		<ul>
			<li v-for="(item, index) in tabs" :key="index">
				<router-link v-if="isRouter" :to="item.hash" exact-active-class="active">
					{{ item.title }}
				</router-link>
				<a
					href="javascript:;"
					v-else
					:class="{ active: now === item.id }"
					@click="handlerBac(item.id)"
					>{{ item.title }}</a
				>
			</li>
		</ul>
	</div>
</template>

<script>
import { ref } from 'vue';
export default {
	name: 'MusicTabs',
	props: {
		tabs: {
			type: Array,
			default: () => [],
		},
		isRouter: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['handlerBac'],
	setup(props, { emit }) {
		const now = ref(1);
		const handlerBac = id => {
			now.value = id;
			emit('handlerBac', id);
		};
		return { now, handlerBac };
	},
};
</script>

<style lang="less" scoped>
.tabs {
	position: sticky;
	top: 0;
	width: 100%;
	height: 3rem;
	line-height: 3rem;
	margin-bottom: 1rem;
	background-color: #f6f6f6;
	z-index: 10;
	ul {
		display: flex;
		li {
			padding: 0 1rem;
			&:first-child {
				padding-left: 0;
			}
			a {
				font-size: 1rem;
				padding: 0.5rem 0;
			}
			.active {
				color: #1ecc94;
				border-bottom: 2px solid #1ecc94;
			}
		}
	}
}
</style>
