<template>
	<div class="private-list scroll">
		<ul>
			<li
				v-for="item in msg"
				:key="item.fromUser.userId"
				:class="route.query.id == item.fromUser.userId ? 'active' : ''">
				<router-link :to="`/message/private?id=${item.fromUser.userId}`">
					<div class="newMsg">
						<span v-if="item.newMsgCount"></span>
					</div>
					<img v-lazy="item.fromUser.avatarUrl + '?param=220y220'" alt="" />
					<div class="info">
						<span class="name">{{ item.fromUser.nickname }}</span>
						<span class="preview">{{ item.lastMsg.msg }}</span>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import { getPrivateMessage } from '@/api/message';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
	name: 'PrivateList',
	setup() {
		const route = useRoute();
		const router = useRouter();
		const msg = ref([]);
		const offset = ref(1);
		onMounted(() => {
			getPrivateMessage(offset.value).then(result => {
				if (result.data.msgs.length) {
					const id = result.data.msgs[0].fromUser.userId;
					router.replace(`/message/private?id=${id}`);
				}
				msg.value = result.data.msgs.map(e => {
					e.lastMsg = JSON.parse(e.lastMsg);
					return e;
				});
			});
		});
		return {
			msg,
			route,
		};
	},
};
</script>

<style lang="less" scoped>
.private-list {
	width: 20rem;
	background-color: var(--global-bg);
	overflow-y: hidden;
	overflow-x: hidden;
	border-right: 1px solid var(--global-border3);
	padding-right: 1rem;
	&:hover {
		overflow-y: auto;
	}
	ul {
		li {
			margin: 0.5rem 0;
			border-radius: 0.5rem;
			a {
				display: flex;
				padding: 0.5rem;
				img {
					width: 3rem;
					height: 3rem;
					border-radius: 50%;
					margin-right: 0.5rem;
				}
				.info {
					max-width: calc(100% - 4.5rem);
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					border-bottom: 1px solid var(--global-bg6);
					span {
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
					.name {
						font-size: 0.9rem;
						font-weight: bold;
					}
					.preview {
						font-size: 0.8rem;
					}
				}
				.newMsg {
					display: flex;
					align-items: center;
					width: 1rem;
					span {
						display: inline-block;
						width: 0.5rem;
						height: 0.5rem;
						background-color: var(--theme-color-like);
						border-radius: 50%;
					}
				}
			}
		}
		.active {
			background-color: var(--global-bg6);
		}
	}
}
</style>
