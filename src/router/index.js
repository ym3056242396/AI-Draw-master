/*
 * @Author: 星野梦美 222736
 * @Date: 2023-08-30 16:02:20
 * @LastEditors: 174050379@qq.com
 * @LastEditTime: 2023-12-26 10:15:21
 */
import { createRouter, createWebHistory } from 'vue-router';

const routes = import.meta.glob('../pages/*.vue');
const component = import.meta.glob('../components/musicPlayer/*.vue');
// TODO: 后续是否需要改造该方法????
const setRoute = {...routes, ...component};
console.log(setRoute,">setRoute")
const actionBarPages = Object.keys(setRoute).map((v, i) => {
// const actionBarPages = Object.keys(setRoute).map((v, i) => {
  const name = v.match(/\.\/(.*)\.vue$/)[1];
  const tempName = ['1', '2', '3','4'];
  return {
    path: `/${name.toLowerCase()}`,
    component: setRoute[v],
    name: tempName[i],
  };
});
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
});
export default router;
