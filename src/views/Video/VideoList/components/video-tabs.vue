<template>
	<div class="video-tabs">
		<div class="tag-list">
			<div class="select-tab">
				<a href="javascript:;" @click="isShowList = true">
					<span>{{ defaultTab }}</span>
					<i class="iconfont icon-xiangyoujiantou"></i>
				</a>
			</div>
			<div class="more scroll" ref="more" v-show="isShowList">
				<div class="head">
					<a href="javascript:;" @click="changTab(undefined, '全部视频')">全部视频</a>
				</div>
				<div class="item">
					<ul>
						<li
							v-for="item in tabList"
							:key="item.id"
							:class="{ active: nowTab === item.id }"
							@click="changTab(item.id, item.name)">
							<a href="javascript:;">{{ item.name }}</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="category-list">
			<ul>
				<li
					v-for="item in categoryList"
					:key="item.id"
					:class="{ active: nowTab === item.id }"
					@click="changCategory(item.id, item.name)">
					<a href="javascript:;">{{ item.name }}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { getVideoTagList, getVideoCategoryList } from '@/api/video';
import { ref, shallowRef } from 'vue';
import { onClickOutside } from '@vueuse/core';
export default {
	name: 'VideoTabs',
	emits: ['changVideoLists'],
	setup(props, { emit }) {
		const categoryList = shallowRef([]);
		const tabList = shallowRef([]);
		const nowTab = ref(0);
		const isShowList = ref(false);
		const more = ref(null);
		const defaultTab = ref('全部视频');
		const changTab = (id, name) => {
			emit('changVideoLists', id);
			nowTab.value = id;
			isShowList.value = false;
			defaultTab.value = name;
		};
		const changCategory = (id, name) => {
			emit('changVideoLists', id);
			nowTab.value = id;
			defaultTab.value = name;
		};
		getVideoCategoryList().then(data => (categoryList.value = data.data.data));
		getVideoTagList().then(data => (tabList.value = data.data.data));
		onClickOutside(more, () => (isShowList.value = false));
		return {
			categoryList,
			tabList,
			more,
			nowTab,
			changTab,
			changCategory,
			isShowList,
			defaultTab,
		};
	},
};
</script>

<style lang="less" scoped>
.video-tabs {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 1rem;
	.tag-list {
		position: relative;
		.select-tab {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 7rem;
			height: 2rem;
			line-height: 2rem;
			border: 1px solid #ccc;
			border-radius: 1rem;
			a {
				span,
				i {
					font-size: 0.9rem;
				}
			}
		}
		.more {
			position: absolute;
			top: 0;
			left: 7.5rem;
			width: 43rem;
			border-radius: 0.5rem;
			padding: 0 1rem;
			background-color: #fff;
			overflow-y: auto;
			max-height: 25rem;
			filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.2));
			z-index: 1;
			.head {
				padding: 1rem;
				border-bottom: 2px solid #ccc;
				a {
					transition: color 0.2s;
					font-size: 0.8rem;
					&:hover {
						color: #1ecf9d;
					}
				}
			}
			.item {
				padding: 1rem 0;
				ul {
					display: grid;
					gap: 1rem;
					grid-template-columns: repeat(6, 1fr);
					li {
						height: 2rem;
						line-height: 2rem;
						text-align: center;
						border-radius: 1rem;
						transition: all 0.2s;
						border: 1px solid #fff;
						a {
							display: block;
							width: 100%;
							font-size: 0.8rem;
						}
						&:hover {
							border-color: #1ecf9d;
						}
					}
					.active {
						background-color: #1ecf9d;
						border-color: #1ecf9d;
						a {
							color: #fff;
						}
					}
				}
			}
		}
	}
	.category-list {
		ul {
			display: flex;
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
					border-color: #1ecf9d;
				}
			}
			.active {
				background-color: #1ecf9d;
				a {
					color: #fff;
				}
			}
		}
	}
}
</style>
