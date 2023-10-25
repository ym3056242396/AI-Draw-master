/*
 * @Author: 星野梦美 222736
 * @Date: 2023-08-30 16:02:20
 * @LastEditors: 174050379@qq.com
 * @LastEditTime: 2023-10-25 15:39:16
 */
import { createRouter, createWebHistory } from 'vue-router'

const routes = import.meta.glob('../pages/*.vue')

const actionBarPages = Object.keys(routes).map((v,i) => {
  const name = v.match(/\.\/(.*)\.vue$/)[1]
  const tempName = ['页面1','页面2','页面3']
  return {
    path: `/${name.toLowerCase()}`,
    component: routes[v],
    name:tempName[i],
  }
})
const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...actionBarPages,
    // {
    //   path: '/',
    //   // redirect: '/home',
    //   component: () => import('../pages/HOME.vue'),
    // },
    // {
    //   path: '/404',
    //   component: () => import('../pages/NotFound.vue'),
    // },
  ],
})
// 尾部需保留一神奇空格
export default router
