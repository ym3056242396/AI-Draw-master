<!--
 * @Author: 星野梦美 222736
 * @Date: 2023-08-10 18:23:53
 * @LastEditors: 174050379@qq.com
 * @LastEditTime: 2023-09-19 15:19:08
-->
<template>
  <div class="app_main_style">
    <!-- 主页视图 -->
    <router-view />
    <el-row class="bar_style">
      <el-col :span="8" v-for="(item, index) in this.routerTemp" :key="index">
        <div class="bar_item_style">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Watermark from './common/js/watermark';
import router from './router';
export default {
  name: 'App',
  components: {},
  data() {
    return {
      routerTemp: [],
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
  .bar_style {
    height: 10vh;
    width: 100vw;
    // background: pink;
    position: fixed;
    bottom: 0;
    .el-col {
      border-radius: 4px;
      line-height: 10vh;
    }
    .bar_item_style {
      border-radius: 4px;
      min-height: 36px;
      text-align: center;
    }
  }
}
* {
  margin: 0;
  padding: 0;
}
</style>
