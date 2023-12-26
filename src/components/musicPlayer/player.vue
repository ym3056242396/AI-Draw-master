<template>
  <div class="appFaBody">
    <!-- <img class="img_bk" :src="setImgUrl" :fit="'fill'" /> -->
    <!-- <el-color-picker v-model="musicPlayerColor" /> -->
    <div class="playerBody">
      <el-input v-model="musicIdSearch" placeholder="请输入搜索关键字" class="input-with-select">
        <template #prepend>
          <el-select v-model="musicDefaultChoice">
            <el-option
              v-for="item in musicInfoList"
              :key="item.id"
              :label="item.chName"
              :value="item.name"
            />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="queryMusicFun" />
        </template>
      </el-input>
      <!-- <el-select v-model="musicPlayerType">
            <el-option
              :disabled="item.id !== 3"
              v-for="item in playerTypeList"
              :key="item.id"
              :label="item.typeName"
              :value="item.value"
            />
          </el-select> -->
      <br />
      <meting-js
        style="color: #333"
        ref="metingRef"
        @click="musicItmeClick($event)"
        :id="musicIdSearch"
        :server="musicDefaultChoice"
        :theme="musicPlayerColor"
        :type="musicPlayerType"
        :key="musicKey"
        autoplay="false"
        list-max-height="340px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

// 音乐平台列表
const musicInfoList = [
  {
    name: 'netease',
    chName: '网易云音乐',
    id: 0,
  },
  {
    name: 'tencent',
    chName: 'QQ音乐',
    id: 1,
  },
  {
    name: 'kugou',
    chName: '酷狗音乐',
    id: 2,
  },
  {
    name: 'xiami',
    chName: '虾米音乐',
    id: 3,
  },
  {
    name: 'baidu',
    chName: '百度音乐',
    id: 4,
  },
];
// 查询类型
const playerTypeList = [
  {
    value: 'song',
    typeName: '单曲',
    id: 0,
  },
  {
    value: 'playlist',
    typeName: '歌单',
    id: 1,
  },
  {
    value: 'album',
    typeName: '专辑',
    id: 2,
  },
  {
    value: 'search',
    typeName: '搜索结果',
    id: 3,
  },
  {
    value: 'artist',
    typeName: '艺术家',
    id: 4,
  },
];
let metingRef = ref();
let setImgUrl = ref('');
let musicIdSearch = ref('Sea of Tranquility');
let musicPlayerColor = ref('#00FFD9');
let musicKey = ref(0);
let musicDefaultChoice = ref('netease');
let musicPlayerType = ref('search');

// 搜索获取歌曲
const queryMusicFun = () => {
  musicKey.value = new Date().getTime();
};
// 单曲点击事件  需要阻止首次进入页面会获取list
const musicItmeClick = e => {
  if (!e.target.innerText) return;
  // 获取当前点击的id
  let id = e.target.innerText.replace(/[^0-9]/g, '');
  const requestMusicList = metingRef.value.aplayer.list.audios ?? [];
  if (!requestMusicList) return;
  setImgUrl.value = requestMusicList[id - 1].pic ?? '';
};
</script>
<style scoped>
.img_bk {
  width: 100%;
  height: 100%;
  z-index: -200;
}
.appFaBody {
  width: 100%;
  height: 100%;
}
</style>
