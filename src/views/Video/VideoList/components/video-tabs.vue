<template>
	<div class="video-tabs">
		<div class="tag-list">
			<div class="select-tab">
				<a href="javascript:;" @click="isShowList = true">
					<template v-for="item in tabList" :key="item.id">
						<span v-if="nowTab === item.id">{{ item.name }}</span>
					</template>
					<i class="iconfont icon-xiangyoujiantou"></i>
				</a>
			</div>
			<div class="more scroll" ref="more" v-show="isShowList">
				<div class="head">
					<router-link to="/video" @click="isShowList = false">全部视频</router-link>
				</div>
				<div class="item">
					<ul>
						<li
							v-for="item in tabList"
							:key="item.id"
							:class="{ active: nowTab === item.id }"
							@click="isShowList = false">
							<router-link :to="`/video?id=${item.id}`">{{ item.name }}</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="category-list">
			<ul>
				<li v-for="item in categoryList" :key="item.id" :class="{ active: nowTab === item.id }">
					<router-link :to="`/video?id=${item.id}`">{{ item.name }}</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { getVideoTagList, getVideoCategoryList } from '@/api/video';
import { ref, shallowRef, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useRoute } from 'vue-router';
export default {
	name: 'VideoTabs',
	setup() {
		const route = useRoute();
		const categoryList = shallowRef([]);
		const tabList = shallowRef([]);
		const nowTab = ref(0);
		const isShowList = ref(false);
		const more = ref(null);
		watch(
			() => route.query.id,
			newVal => {
				if (newVal && route.name === 'video') {
					const id = +newVal;
					nowTab.value = id;
				} else {
					nowTab.value = 0;
				}
			},
			{ immediate: true }
		);
		getVideoCategoryList().then(data => (categoryList.value = data.data.data));
		getVideoTagList().then(data => {
			data.data.data.push({ id: 0, name: '全部视频' });
			tabList.value = data.data.data;
		});
		onClickOutside(more, () => (isShowList.value = false));
		return {
			categoryList,
			tabList,
			more,
			nowTab,
			isShowList,
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
