<!--
 * @Author: 星野梦美 222736
 * @Date: 2023-08-10 18:23:53
 * @LastEditors: 174050379@qq.com
 * @LastEditTime: 2023-10-25 15:38:27
-->
<template>
  <div>
    <div class="app_main_style">
      <!-- 导航栏 -->
      <div class="window_header">
        <div class="img_box">
          <img src="aaaa" alt="" />
        </div>
      </div>

      <!-- 主页视图 -->
      <div class="view_body_style">
        <router-view />
      </div>

      <!-- 菜单 -->
      <div class="bar_style">
        <div class="itemstyle">
          <div v-for="(item, index) in this.routerTemp" :key="index">
            <router-link :to="item.path"
              ><div class="bar_item_style"> {{ item.name }}</div></router-link
            >
          </div>
        </div>
        <div style="text-align:center;"><el-icon><Setting /></el-icon></div>
      </div>
    </div>
  </div>
</template>
<script>
import { ArrowLeft, ArrowRight, Delete, Edit, Share ,Setting,House,Plus} from '@element-plus/icons-vue';
import Watermark from './common/js/watermark';
import router from './router';
export default {
  name: 'App',
  components: {
    ArrowLeft,
    ArrowRight,
    Setting,
    House,
    Plus
  },
  data() {
    return {
      routerTemp: [],
      drawer: false,
    };
  },
  methods: {},
  mounted() {
    // Watermark.set('ELVES');
    this.routerTemp = JSON.parse(JSON.stringify(router.options.routes));
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
</style>

<style scoped lang="less">
.app_main_style {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .window_header {
    height: 6vh;
    width: 98vw;
    margin-left: 1vw;
    margin-top: 1vh;
    background: #111;
    z-index: 9999;
    overflow: hidden;
    .img_box {
      width: 16vw;
      height: 4vh;
      margin-top: 1vh;
      margin-left: 1vw;
      background: #fff;
    }
  }
  .bar_style {
    height: 89vh;
    width: 4vw;
    margin-top: 2vh;
    margin-left: 1vw;
    background: #f4f4f4;
    .itemstyle {
      height: 90%;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
      border-bottom: 1px solid #e1e1e1;
    }

    .bar_item_style {
      color: #111;
      font-size: 1vw;
    }
    float: left;
  }
  .view_body_style {
    float: right;
    width: 93vw;
    height: 89vh;
    margin-top: 2vh;
    margin-right: 1vw;
    background: #f4f4f4;
  }
}
</style>
