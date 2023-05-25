<template>
	<div class="system overflow scroll">
		<div class="item" v-for="item in notices" :key="item.id">
			<img v-lazy="item.notice.user.avatarUrl" alt="" />
			<div class="info">
				<div class="userName">
					<router-link :to="`/user?id=${item.notice.user.userId}`">
						{{ item.notice.user.nickname }}
					</router-link>
					<span>赞了你的评论</span>
				</div>
				<div class="content">
					<span>{{ item.notice.comment.content }}</span>
				</div>
			</div>
			<div class="time">
				<span>{{ item.time }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { getNoticeMessage } from '@/api/message';
import { useDateFormat } from '@vueuse/core';
import { ref, onMounted } from 'vue';
export default {
	name: 'MessageSystem',
	setup() {
		const notices = ref([]);
		onMounted(() => {
			getNoticeMessage().then(result => {
				notices.value = result.data.notices.map(e => {
					e.notice = JSON.parse(e.notice);
					e.time = useDateFormat(e.time, 'YYYY-MM-DD HH:mm:ss');
					return e;
				});
			});
		});
		return { notices };
	},
};
</script>

<style lang="less" scoped>
.system {
	flex: 1;
	height: 100%;
	overflow-y: auto;
	padding-right: 1.78rem;
	.item {
		display: flex;
		padding: 1rem 0;
		img {
			width: 3rem;
			height: 3rem;
			border-radius: 50%;
			object-fit: cover;
		}
		.info {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			border-bottom: 1px solid #ddd;
			margin-left: 1rem;
			.userName {
				a {
					font-size: 0.9rem;
					font-weight: bold;
					color: #1ecc94;
				}
			}
			.content {
				font-size: 0.8rem;
			}
		}
	}
}
</style>
