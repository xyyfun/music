const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	devServer: {
		proxy: {
			'/api': {
				target: '', // Vercel/腾讯云部署后的域名
				ws: true,
				pathRewrite: {
					'^/api': '', //路径重写，将接口路径中以/api开头的部分替换掉
				},
			},
		},
	},
});
