<template>
	<transition name="message-box-fade" appear>
		<div class="music-box-wrapper">
			<div class="music-box">
				<div class="message-box-header">
					<div class="message-box-title">
						<span>{{ messageBoxProps.title }}</span>
					</div>
					<a href="javascript:;" v-if="messageBoxProps.isShowClose" @click="cancel">
						<i class="iconfont icon-cuo"></i>
					</a>
				</div>
				<div class="message-box-content">
					<div class="message-box-message">
						<i class="iconfont icon-warn"></i>
						<p>{{ messageBoxProps.message }}</p>
					</div>
				</div>
				<div class="message-box-btns">
					<a href="javascript:;" v-if="messageBoxProps.isShowCancel" @click="cancel">
						{{ messageBoxProps.cancelButtonText }}
					</a>
					<a href="javascript:;" class="active" @click="confirm">
						{{ messageBoxProps.confirmButtonText }}
					</a>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'MusicMessageBox',
	props: {
		messageBoxProps: {
			type: Object,
			default: () => {},
		},
		submitCallback: {
			type: Function,
		},
		cancelCallback: {
			type: Function,
		},
	},
	setup(props) {
		const confirm = () => {
			props.submitCallback();
		};
		const cancel = () => {
			props.cancelCallback();
		};
		return {
			confirm,
			cancel,
		};
	},
};
</script>

<style lang="less" scoped>
.music-box-wrapper {
	overflow: hidden;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 999;
	.music-box {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;
		min-width: 26rem;
		max-width: 600px;
		padding: 1rem;
		background-color: #fff;
		border-radius: 0.2rem;
		border: 1px solid #ebeef5;
		font-size: 1rem;
		.message-box-header {
			display: flex;
			justify-content: space-between;
		}
		.message-box-content {
			padding: 1rem 0;
			.message-box-message {
				display: flex;
				align-items: center;
				i {
					color: #e6a23c;
					font-size: 1.5rem;
					margin-right: 0.5rem;
				}
				p {
					font-size: 0.8rem;
				}
			}
		}
		.message-box-btns {
			display: flex;
			justify-content: flex-end;
			a {
				display: block;
				width: 3.5rem;
				height: 2rem;
				line-height: 2rem;
				text-align: center;
				font-size: 0.8rem;
				border-radius: 0.2rem;
				margin-left: 1rem;
				border: 1px solid #ebeef5;
			}
			.active {
				background-color: #1fd2a9;
				color: #fff;
			}
		}
	}
}
.message-box-fade-enter-from,
.message-box-fade-leave-to {
	opacity: 0;
}
.message-box-fade-enter-active,
.message-box-fade-leave-active {
	transition: all 0.3s;
}
.message-box-fade-enter-to,
.message-box-fade-leave-from {
	opacity: 1;
}
</style>
