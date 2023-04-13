<template>
	<div class="app-login overflow">
		<div class="content-login">
			<div class="main">
				<div class="login-logo">
					<h1>
						<router-link to="/"><img src="../../assets/images/logo.png" alt="" /></router-link>
					</h1>
					<div>
						<span> Q Q 音 乐 </span>
						<span> 听 我 想 听 </span>
					</div>
				</div>
				<LoginForm />
			</div>
			<LoginFooter />
		</div>
	</div>
</template>

<script>
import LoginForm from './components/login-form';
import LoginFooter from './components/login-footer';
export default {
	name: 'AppLogin',
	components: { LoginForm, LoginFooter },
};
</script>

<style lang="less" scoped>
.app-login {
	width: 100vw;
	height: 100vh;
	background: url('../../assets/images/20171122191630_ff8fef.webp') no-repeat 50%;
	background-size: cover;
	.content-login {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		.main {
			flex: 1;
			display: flex;
			justify-content: space-between;
			padding-top: 8rem;
			width: 50vw;
			min-width: 45rem;
			.login-logo {
				h1 {
					a {
						img {
							width: 12rem;
							height: 3rem;
						}
					}
				}
				div {
					display: flex;
					justify-content: space-between;
					span {
						color: #fff;
						font-size: 1.3rem;
					}
				}
			}
		}
	}
}
</style>
