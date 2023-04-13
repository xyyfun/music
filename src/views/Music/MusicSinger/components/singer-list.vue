<template>
	<div class="singer-list">
		<div class="list">
			<ul>
				<li v-for="item in singerDataList" :key="item.id">
					<router-link :to="`/singer/${item.id}`" :title="item.name">
						<img v-lazy="item.img1v1Url + '?param=130y130'" alt="" />
					</router-link>
					<span class="ellipsis">{{ item.name }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SingerList',
	props: {
		singerDataList: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="less" scoped>
.singer-list {
	padding-top: 2rem;
	.list {
		ul {
			display: grid;
			gap: 1.25rem;
			grid-template-columns: repeat(10, minmax(0, 1fr));
			li {
				display: flex;
				flex-direction: column;
				a {
					border-radius: 50%;
					display: block;
					overflow: hidden;
					img {
						width: 100%;
						object-fit: cover;
					}
				}
				span {
					text-align: center;
					font-size: 0.9rem;
					color: #334155;
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
}
</style>
