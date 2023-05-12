<template>
	<div class="user-description">
		<div class="description" v-if="userInfo.userId">
			<img v-lazy="userInfo.avatarUrl + '?param=220y220'" alt="" />
			<div class="info">
				<div class="nickname">
					<span>{{ userInfo.nickname }}</span>
				</div>
				<div class="follow">
					<span>粉丝：{{ userInfo.followeds }}</span>
					<span>关注：{{ userInfo.follows }}</span>
				</div>
				<div class="signature" v-if="userInfo.signature">
					<span>个人介绍：{{ userInfo.signature }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getUserDetail } from '@/api/user';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
export default {
	name: 'UserDescription',
	setup() {
		const route = useRoute();
		const userInfo = ref({});
		const bindings = ref([]);
		onMounted(() => {
			watch(
				() => route.query.id,
				newVal => {
					if (!newVal) return;
					getUserDetail(newVal).then(result => {
						// console.log(result);
						bindings.value = result.data.bindings;
						userInfo.value = result.data.profile;
					});
				},
				{ immediate: true }
			);
		});
		return {
			userInfo,
		};
	},
};
</script>

<style lang="less" scoped>
.user-description {
	.description {
		display: flex;
		> img {
			width: 11rem;
			height: 11rem;
			object-fit: cover;
			border-radius: 50%;
		}
		.info {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-left: 2rem;
			span {
				font-size: 0.9rem;
			}
			.nickname {
				span {
					font-size: 1.5rem;
				}
			}
			.follow {
				display: flex;
				span {
					margin-right: 1rem;
				}
			}
		}
	}
}
</style>
