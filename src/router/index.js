import NProgress from 'nprogress' // Progress 进度条
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import auth_routes from '@/views/auth-views/router'
import window_router from '@/views/window-views/router'
import { Auths } from '@/store/auth';

// 定义一个路由数组，统一管理路由
const routes = [
  {
    path: '/',        // 路由地址：首页
    name: 'Home',     // 命名路由
    component: Home,   // 对应的组件
    meta: {
      title: '首页',  // 设置浏览器标题
    },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/auth-views/router-layout.vue'),
    meta: {
      title: '认证',  
      // lable: '认证',  
    },
    redirect: "/auth/login",
    children: auth_routes
  },
  {
    path: '/window',
    name: 'Window',
    component: () => import('@/views/window-views/router-layout.vue'),
    meta: {
      title: '首页',  
      // lable: '认证',  
    },
    redirect: "/window/home",
    children: window_router
  }
]

// 使用 createRouter 方法创建路由实例
const router = createRouter({
  history: createWebHistory(), // 指定 history 模式，这里采用的是 hash 模式
  routes // 定义路由数组，相当于 routes: routes 的简写模式
})


function getTitle(route) {
  let title = '';
  if (route.meta && route.meta.title) {
    title = route.meta.title;
  }
  return title;
}

// -前置守卫路由:登录校验
router.beforeEach((to, from, next)=>{
  NProgress.start();
  console.log('11111111111111111111111111111111111111' );
  document.title = getTitle(to);; // 设置浏览器标题
  // const store = Auths()
  // //-：获取是否登录的状态
  // let isLogin = store.isLogin
  // let userphone = store.userInfo.userPhone
  // console.log('isLogin = ' + isLogin);
  // console.log('to.name  = ' + to.name );
  // console.log('phone = ' + userphone);
  // //-:访问的请求不是 login，不是reg 也没有登录
  // if(to.name !== 'Login' && !isLogin){
  //   console.log('22222222222222' );
  //   next({name: 'Login'})
  // }else if(to.name == 'login' && isLogin){//-:已经登录了，还在访问登录请求
  //     next({name: ''})
  // }
  // NProgress.done();
  next()
})

// router.beforeEach((to, from, next)=>{
//   document.title = getTitle(to);; // 设置浏览器标题
//   next()
// })


  
router.afterEach((to, from) => {
  // 在路由跳转后执行的逻辑
})

// ES6 模块导出语句，它用于将 router 对象导出，以便其他文件可以导入和使用这个对象
export default router