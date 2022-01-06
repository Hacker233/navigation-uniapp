const guard = new UniRouteGuards();

// 自定义路由拦截白名单
import Vue from 'vue'
import UniRouteGuards from 'uniapp-route-guards';
Vue.use(UniRouteGuards)

const WHILE_LIST = ['/src/pages/home', '/src/pages/log']; // 无需走路由前置的路由

// 跳过路由白名单拦截
guard.beforeEach((to, from, next) => {
	if (WHILE_LIST.includes(from.url)) {
		return next(to.url);
	}

	next();
});

// 拦截 调用 uni.switchTab 页面C并跳转到 页面D
guard.beforeEach((to, from, next) => {
	console.log('\n');
	console.log('=================');
	console.log('guard.beforeEach');
	console.log('to: ', to);
	console.log('from: ', from);
	console.log('=================');
	console.log('\n');

	// 如果跳转到登录页面，则需要存储重定向地址
	if (to.url == "/pages/login/login" && from.url !== "/pages/login/register") {
		uni.setStorageSync('redirectURL', from.url)
	}
	if (to.action === 'switchTab' && to.url === '/src/pages/c') {
		return next({
			url: '/src/pages/d',
			action: 'navigateTo'
		});
	}

	next();
});
