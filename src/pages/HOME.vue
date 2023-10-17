<!--
 * @Author: 星野梦美 222736
 * @Date: 2023-08-30 16:09:53
 * @LastEditors: 174050379@qq.com
 * @LastEditTime: 2023-09-28 16:28:08
-->
<!-- 主页 -->
<template>
  <div style="padding: 20px">
    <el-carousel :interval="4000" type="card" :autoplay="false">
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <el-image :src="item.url" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      imgList: [
        {
          url: 'https://img.zcool.cn/community/01xa8n4rthlg1zhguebfek3538.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp',
          name: 'no1',
        },
        {
          url: 'https://img.zcool.cn/community/01qb3qgtdcp6uq9vxcbtpn3236.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp',
          name: 'no2',
        },
        // {
        //   url: 'https://img.zcool.cn/community/01ss9dybsuwm9hpsemue713834.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp',
        // },
        // {
        //   url: 'https://img.zcool.cn/community/01ss9dybsuwm9hpsemue713834.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp',
        // },
        // {
        //   url: 'https://img.zcool.cn/community/015cnxezseptt0and4sjtv3933.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp',
        // },
        // {
        //   url: 'https://img.zcool.cn/community/01gjxvpnulp1c7ob8abgdb3838.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp',
        // },
        // {
        //   url: 'https://img.zcool.cn/community/01jkuxdgtwrhujvoalm44i3333.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp',
        // },
        // {
        //   url: 'https://img.zcool.cn/community/01mymamozigjivzva5w28j3934.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp',
        // },
      ],
    };
  },
  methods: {
    queryimgindex(e) {
      console.log(e, '>>ee');
    },
  },
};
</script>
<style scoped lang="less">
.el-carousel__item {
  height: 20rem;
}
.el-carousel__container {
  height: 20rem;
}
.el-carousel__item:nth-child(2n) {
  background-color: pink;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
