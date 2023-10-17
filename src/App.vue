<!--
 * @Author: 星野梦美 222736
 * @Date: 2023-08-10 18:23:53
 * @LastEditors: 174050379@qq.com
 * @LastEditTime: 2023-09-28 17:28:55
-->
<template>
  <div class="app_main_style">
    <div class="header">
      <div class="img_box">
        <img src="aaaa" alt="" />
      </div>
      <el-button class="btn_header">
        <el-icon class="el-icon--right"><ArrowRight />111</el-icon>
      </el-button>
    </div>
    <!-- 主页视图 -->
    <router-view class="body_style" />
    <!-- 菜单 -->
    <div class="bar_style">
      <div class="i_style"></div>
      <div v-for="(item, index) in this.routerTemp" :key="index">
        <router-link :to="item.path"
          ><div class="bar_item_style">{{ item.name }}</div></router-link
        >
        <div class="item_i_style"></div>
      </div>
    </div>
    <!-- 抽屉 -->
    <!-- <el-drawer style="z-index:99999;" v-model="drawer" title="I am the title" direction="rtl" :before-close="handleClose">
      <span>Hi, there!</span>
    </el-drawer> -->
  </div>
</template>
<script>
import {
  ArrowLeft,
  ArrowRight,
  Delete,
  Edit,
  Share,
} from '@element-plus/icons-vue'
import Watermark from './common/js/watermark';
import router from './router';
export default {
  name: 'App',
  components: {
    ArrowLeft,
    ArrowRight
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
    console.log(this.routerTemp, '>>router');
  },
};
</script>

<style scoped lang="less">
.app_main_style {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #6b6b6b;

  .header {
    height: 6vh;
    width: 100vw;
    z-index: 9999;
    position: sticky;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .img_box {
      width: 20vw;
      height: 4vh;
      margin-top: 1vh;
      margin-left: 1vw;
      background: yellow;
    }
    .btn_header {
      margin-top: 1vh;
      margin-right: 1vw;
      // float: right;
    }
  }
  .body_style {
    padding-top: 40px;
    padding-left: 20px;
  }
  .bar_style {
    position: absolute;
    top: 6%;
    left: 2%;
    .i_style {
      width: 1px;
      height: 300px;
      background: #fff;
      margin: 20px;
      position: relative;
    }
    .item_i_style {
      width: 1px;
      height: 40px;
      background: #fff;
      margin: 20px;
      position: relative;
    }
    .bar_item_style {
      color: whitesmoke;
      font-size: 14px;
    }
    .bar_item_style:hover {
      color: whitesmoke;
      font-size: 16px;
    }
  }
}
</style>
