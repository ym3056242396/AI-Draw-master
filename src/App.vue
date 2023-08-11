<template>
  <div class="w-full h-screen">
    <!-- toolbar -->
    <div class="w-full h-14 pt-2 border-b-2 text-center fixed">
      <!-- 窗口左上角HOME图标 -->
      <!-- <a href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 absolute left-4 top-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </a> -->
      <!-- <span class="leading-10 font-bold"
        >{{ name }} {{ config?.mode === 'completions' ? '（无上下文）' : '' }}</span
      > -->
      <!-- 右上角图标 清空记录 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4 absolute right-4 top-5 cursor-pointer"
        @click="cleanHistory"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </div>
    <!-- main content -->
    <!-- TODO:  服务器地址默认本地-->

    <div class="flex w-full h-full pt-14">
      <!-- left  -->
      <!-- <div class="flex-none w-0 md:w-[260px] bg-slate-200 border-r-2 hidden md:block p-8 text-sm">
        <t-form labelAlign="top">
          <t-form-item label="StableDiffusion服务器类型" name="sdServerType">
            <t-select
              v-model="sdServerType"
              @change="handleSDServerTypeChange"
              class="bg-gray-200"
              style="background: #ccc; font-size: 12px"
            >
              <t-option
                v-for="(item, index) in sdServerTypeOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
                {{ item.label }}
              </t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="服务器地址" name="sdServerUrl">
            <t-textarea
              placeholder="请输入内容"
              v-model="sdServerUrl"
              :autosize="true"
              @change="saveConfig"
            />
          </t-form-item>
        </t-form>

        <t-card class="bg-orange-100 mt-8 text-gray-600 text-sm" v-if="sdServerType === 'common'">
          公共服务器为临时提供的测试服务器，可能存在需要排队或随时下线的可能。<br/>
          建议使用
          <t-tooltip content="购买后上面服务器地址填写 工作台-Stable Diffusion WebUI域名即可" theme="primary">
            <t-link href="https://inscode.csdn.net/gpu?utm_source=sd_app" target="_blank" :suffix-icon="renderSuffixIcon" underline>私有服务器</t-link>
          </t-tooltip>
        </t-card>

        <t-form
          labelAlign="top"
          label-width="100"
          :style="{ display: showProfileSetting ? 'block' : 'none' }"
        >
          <t-form-item label="机器人头像">
            <t-input placeholder="请输入内容" v-model="config.robot_img"/>
            <t-space
              direction="vertical"
              align="center"
              v-for="(imgItem, index) in robotAvatarList"
              :key="index"
              class="mr-2 cursor-pointer hover:bg-blue-600"
            >
              <t-image
                class="rounded-lg border-2"
                :class="{ 'border-blue-800': imgItem.src === config.robot_img }"
                @click="changeRobotAvatar(imgItem.src)"
                :src="imgItem.src"
                fit="cover"
                :style="{ width: '40px', height: '40px' }"
              />
              <span>{{ imgItem.name }}</span>
            </t-space>
          </t-form-item>

          <t-form-item label="你的头像">
            <t-space
              direction="vertical"
              align="center"
              v-for="(imgItem, index) in userAvatarList"
              :key="index"
              class="mr-2 cursor-pointer hover:bg-blue-600"
            >
              <t-image
                class="rounded-lg border-2"
                :class="{ 'border-blue-800': imgItem.src === config.user_img }"
                @click="changeUserAvatar(imgItem.src)"
                :src="imgItem.src"
                fit="cover"
                :style="{ width: '40px', height: '40px' }"
              />
              <span>{{ imgItem.name }}</span>
            </t-space>
          </t-form-item>
          <t-form-item label="机器人对你的称呼" help="多个称呼用逗号隔开">
            <t-input v-model="config.user_call_name" />
          </t-form-item>
        </t-form>
      </div> -->
      <!-- right -->
      <div class="flex-auto p-2 sm:p-8" style="background: rgb(235 37 37 / 6%)">
        <!-- 整体背景板 -->
        <div
          class="w-full h-full m-auto relative container max-w-6xl rounded-xl"
          style="background: #fff"
        >
          <div
            class="w-full h-full pb-24 p-4 overflow-y-auto overflow-x-hidden"
            style="padding-bottom: 20rem"
            ref="messageList"
          >
            <div v-for="(item, index) in message" :key="index" class="mb-8">
              <div v-if="item.user === 'User'">
                <div class="flex flex-row-reverse">
                  <!-- <t-image
                    class="rounded-lg"
                    v-if="config.user_img"
                    :src="config.user_img"
                    fit="cover"
                    :style="{ width: '40px', height: '40px' }"
                  ></t-image> -->
                  <!-- 主动聊天背景 文字内 -->
                  <div
                    class="text-gray-700 p-4 mx-2 w-fit max-w-2xl 2xl:max-w-4xl rounded-lg cursor-pointer"
                    style="background: rgba(39, 228, 123, 0.46)"
                    @click="copyAsPrompt(item.message)"
                    v-html="item.message"
                  ></div>
                </div>
              </div>
              <div v-else class="flex">
                <!-- <t-image
                  class="rounded-lg"
                  v-if="config.robot_img"
                  :src="config.robot_img"
                  fit="cover"
                  :style="{ width: '40px', height: '40px' }"
                ></t-image> -->
                <div
                  class="bg-slate-50 text-gray-700 p-4 mx-2 w-fit max-w-2xl 2xl:max-w-4xl rounded-lg text-wrapper"
                >
                  <template v-if="item?.viewMode ?? 'chat' === 'image'">
                    <img v-if="item.img" :src="item.img" />
                    <img v-else src="/loading.gif" class="w-[512px]" />
                  </template>
                  <template>
                    {{ item.message ? item.message : '...' }}
                  </template>
                </div>
              </div>
            </div>
            <!-- <div class="text-center" v-if="mode !== 'draw'">
              <div
                v-if="loading"
                @click="stop"
                class="-mt-4 px-5 py-1 m-auto w-fit cursor-pointer hover:bg-slate-300 border-dotted border-[1px] border-slate-400 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="animate-spin w-4 h-4 inline-block"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
                  />
                </svg>
                <span class="ml-2 text-[12px]">停止</span>
              </div>
            </div> -->
          </div>
          <div
            class="w-full absolute bottom-0 bg-slate-50 h-22 py-2 px-2 rounded flex flex-col text-sm"
            style="border: 2px solid #f4f4f4"
          >
            <!-- 切换AI类型 -->
            <!-- <t-dropdown :options="options" v-model="aiType" @click="clickHandler" class="ml-4 mt-1">
                <t-button theme="default" variant="text" shape="square">
                  <t-icon
                    :name="modeImage"
                    size="24"
                    class="w-6 h-6 text-cyan-800 font-bold hover:text-cyan-600 cursor-pointer"
                  />
                </t-button>
              </t-dropdown> -->
            <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                @click="showMoreSetting=!showMoreSetting"
                class="w-6 mx-2 ml-4 mt-2 h-6 flex-none text-cyan-800 font-bold hover:text-cyan-600 cursor-pointer">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg> -->
            <el-form
              size="mini"
              ref="form"
              :model="form"
              label-width="150px"
              v-if="mode === 'draw'"
            >
              <el-form-item label="生成图片关联词：">
                <!-- v-on:keyup.enter="query" -->
                <el-input
                  v-model="prompt"
                  placeholder="AI生成提示词(目前只支持英文输入)"
                ></el-input>
              </el-form-item>

              <el-form-item label="逆向敏感词汇：">
                <!-- v-on:keyup.enter="query" -->
                <el-input
                  v-model="negative_prompt"
                  placeholder="逆向提示词(目前只支持英文输入)"
                ></el-input>
              </el-form-item>

              <el-form-item label="图片分辨率：">
                <div style="display: flex">
                  <el-input v-model="width" placeholder="请输入图片宽度"></el-input>
                  <div class="h-10 leading-10">*</div>
                  <el-input v-model="height" placeholder="请输入图片高度"></el-input>
                </div>
              </el-form-item>
              <el-form-item label="图片采集器：">
                <el-select v-model="sampler" placeholder="请选择">
                  <el-option
                    v-for="item in samplerOptions"
                    :key="item.label"
                    :label="item.label + '_' + item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="绘制精度(推荐20)：">
                <el-slider v-model="steps" :step="20" show-stops> </el-slider>
              </el-form-item>
              <el-button style="width: 100%; z-index: 9999" @click="query">提交</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { Configuration, OpenAIApi } from "openai"
import OpenAI from './js/openai.js';
import Config from './js/config.js';
import SDApi from './js/sd.js';
import StorageApi from './js/storage.js';
import PodsApi from './js/pod.js';

// import MarkdownItVue from 'markdown-it-vue'
// import 'markdown-it-vue/dist/markdown-it-vue.css'
// https://github.com/ravenq/markdown-it-vue
// const DataServe = new Data()
export default {
  name: 'LlmApp',
  components: {
    // MarkdownItVue
  },
  data() {
    return {
      id: 0,
      name: '加载中...',
      userAvatarList: [],
      robotAvatarList: [],
      mode: 'draw',
      modeImage: 'draw', // image chat chart-bubble  //默认类型
      aiType: '',
      message: [
        // {"user": "User", "message": "创建一个用户表，要求分区"},
        // {"user": "AI", "message": "在GaussDB数据库中创建一个带有分区的用户表可以使用以下语句：在GaussDB数据库中创建一个带有分区的用户表可以使用以下语句：在GaussDB数据库中创建一个带有分区的用户表可以使用以下语句：在GaussDB数据库中创建一个带有分区的用户表可以使用以下语句："},
        // {"user": "User", "message": "create table user(id int primary key, name varchar)将这个建表语句翻译成GaussDB建表语句create table user(id int primary key, name varchar)将这个建表语句翻译成GaussDB建表语句create table user(id int primary key, name varchar)将这个建表语句翻译成GaussDB建表语句create table user(id int primary key, name varchar)将这个建表语句翻译成GaussDB建表语句create table user(id int primary key, name varchar)将这个建表语句翻译成GaussDB建表语句"},
        // {"user": "AI", "message": "在GaussDB数据库中，创建一个带有主键约束的用户表可以使用以下语句:"},
      ],
      client: null,
      indexClient: null,
      prompt: '',
      config: {},
      sdServerType: 'common',
      // sdServerTypeOptions: [
      //   { label: '公共服务器', value: 'common' },
      //   { label: '私有服务器', value: 'private' },
      // ],
      // 本地服务器地址
      sdServerUrl: 'https://gpu-pod64d32e0ea825d265df096e6f-6006.node.inscode.run',
      loading: false,
      maxHistory: 200,
      speaking: false, // 是否正在输出语音
      autoSpeech: false, // 是否自动开始语音
      speech: null, // 语音object
      options: [
        { content: '绘图模式', value: 'draw' },
        { content: '聊天模式', value: 'chat' },
        { content: '自动模式', value: 'auto' },
      ],
      showProfileSetting: false, //是否显示角色设置模块
      // 生成图片高宽
      width: 512,
      height: 512,
      // 绘制精度 （浪费资源）
      steps: 20,
      // 采集器
      sampler: 'DPM++ SDE Karras',
      samplerOptions: [
        {
          label: 'Euler a',
          name: '绘制精度推荐30',
          value: 1,
        },
        {
          label: 'Euler',
          name: '绘制精度推荐20+',
          value: 2,
        },
        { label: 'LMS', name: '绘制精度推荐30，多色块', value: 3 },
        {
          label: 'Heun',
          name: '绘制精度推荐30+，细节变化',
          value: 4,
        },
        {
          label: 'DPM2',
          name: '绘制精度推荐30+背景变化',
          value: 5,
        },
        { label: 'DPM2 a', name: '都比较抽象，而且整体变化很大', value: 6 },
        {
          label: 'DPM++ 2S a',
          name: '绘制精度推荐20—30，变化幅度提高',
          value: 7,
        },
        {
          label: 'DPM++ 2M',
          name: '绘制精度推荐30',
          value: 8,
        },
        {
          label: 'DPM++ SDE',
          name: '绘制精度推荐30,背景变化和主体细节增加',
          value: 9,
        },
        { label: 'DPM fast', name: '抽象派', value: 10 },
        { label: 'DPM adaptive', name: '绘制精度推荐10', value: 11 },
        { label: 'LMS Karras', name: '绘制精度推荐10-20', value: 12 },
        {
          label: 'DPM2 Karras',
          name: '绘制精度推荐20-30',
          value: 13,
        },
        {
          label: 'DPM2 a Karras',
          name: '绘制精度推荐20',
          value: 14,
        },
        {
          label: 'DPM++ 2S a Karras',
          name: '绘制精度推荐30，整体颜色饱和度低',
          value: 15,
        },
        {
          label: 'DPM++ 2M Karras',
          name: '绘制精度推荐30，背景细节变化',
          value: 16,
        },
        {
          label: 'DPM++ SDE Karras',
          name: '绘制精度推荐30，细节进一步加强',
          value: 17,
        },
        { label: 'DDIM', name: '绘制精度推荐30', value: 18 },
        { label: 'PLMS', name: '现实的抽象派', value: 19 },
      ],
      showMoreSetting: true,
      // 默认生成提示
      default_prompt:
        '1girl, (ulzzang-6500:0.7), kpop idol, yae miko,pink hair, long hair,best quality, (painting:1.5), (hair ornament:1.35), jewelry, purple eyes, cherry blossoms, lantern light, depth of field, detailed face, face focus, ribbon_trim, (looking at viewer:1.25), nontraditional miko, shiny skin, long sleeves, smile, thick lips, game cg,  (blurry background:1.2), sitting, upper body <lora:YaeMiko_Test:0.45>,<lora:mix4:0.5>',
      // 敏感词汇处理
      negative_prompt:
        'nfsw, bright lantern, brightness, (nipples:1.2), EasyNegative, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, glans,extra fingers, fewer fingers, strange fingers, bad hand,hand,bad finger',
      history: {
        name: 'ai',
        key: 'history',
      },
    };
  },
  methods: {
    // Ai类型切换
    clickHandler() {
      this.modeImage = this.aiType;
    },
    hideLeftMenu() {},
    changeUserAvatar(imgSrc) {
      this.config.user_img = imgSrc;
    },
    changeRobotAvatar(imgSrc) {
      this.config.robot_img = imgSrc;
    },
    getAvatar() {
      let that = this;
      DataServe.find('t_llm_rep_chat_img', { resoure_sub_type: 'user_avatar' }).then(res => {
        if (res && res.status === 200 && res.data && res.data.code === 200 && res.data.data) {
          const data = res.data.data;
          for (let item of data) {
            that.userAvatarList.push({
              src: JSON.parse(item.ext).img_src,
              name: item.name,
            });
          }
        }
      });

      DataServe.find('t_llm_rep_chat_img', { resoure_sub_type: 'robot_avatar' }).then(res => {
        if (res && res.status === 200 && res.data && res.data.code === 200 && res.data.data) {
          const data = res.data.data;
          for (let item of data) {
            that.robotAvatarList.push({
              src: JSON.parse(item.ext).img_src,
              name: item.name,
            });
          }
        }
      });
    },
    initAIClient() {
      this.client = new OpenAI(this.config);
    },
    initIndexClient() {
      if (this.config?.index_url) {
        const index_type = this.config?.index_type;
        //confluence
        if (index_type === 'es') {
          this.indexClient = new RepEs(this.config);
        } else if (index_type === 'confluence') {
          this.indexClient = new RepConfluence(this.config);
        } else {
          this.indexClient = new RepSimple(this.config);
        }
      }
    },
    query() {
      console.log(this.loading, '状态');
      if (this.loading) {
        this.$message({
          message: '正在执行中，请稍等!',
          type: 'warning',
        });
        return;
      }
      if (this.prompt === '') {
        this.$message({
          message: '提示词不能为空！',
          type: 'warning',
        });
        return;
      }
      if (this.mode === 'draw') {
        this.draw();
      } else {
        this.getAnswer();
      }
    },
    scrollBottom() {
      const _this = this;
      this.$nextTick(() => {
        _this.$refs.messageList.scrollTop = _this.$refs.messageList.scrollHeight + 20;
      });
    },
    draw() {
      this.loading = true;
      const currentMsg = {
        user: 'AI',
        message: '',
        img: null,
        viewMode: 'image',
      };
      const query = this.prompt;
      const negative_prompt = this.negative_prompt;
      const _this = this;
      const messages = this.message;
      const content =
        'prompt: <br/>' +
        this.prompt +
        (negative_prompt ? '<br/><br/>' + 'negative_prompt: </br>' + negative_prompt : '') +
        '<br/><br/>' +
        'width: ' +
        this.width +
        ' height: ' +
        this.height +
        '<br/>steps: ' +
        this.steps +
        '<br/>sampler: ' +
        this.sampler;
      messages.push({ user: 'User', message: content });
      messages.push(currentMsg);
      this.scrollBottom();
      const config = JSON.parse(JSON.stringify(this.config));
      config.width = this.width;
      config.height = this.height;
      config.steps = this.steps;
      config.sampler = this.sampler;
      config.sd_api = this.sdServerUrl;
      SDApi.draw(config, query, negative_prompt)
        .then(res => {
          _this.loading = false;
          console.info('close');
          currentMsg.img = res;
          messages.splice(messages.length - 1, 1);
          messages.push(currentMsg);
          _this.scrollBottom();
          _this.saveHistory();
        })
        .catch(err => {
          _this.loading = false;
        });
    },
    getAnswer(context) {
      this.loading = true;
      const _this = this;
      const messages = this.message;
      const currentMsg = {
        user: 'AI',
        message: '',
      };
      messages.push({ user: 'User', message: this.prompt });
      messages.push(currentMsg);
      _this.$refs.messageList.scrollTop = _this.$refs.messageList.scrollHeight;
      const newPrompt = this.prompt;
      console.info(this.prompt);
      console.info(newPrompt);
      this.prompt = '';

      this.client.createCompletion(newPrompt, this.message, context, {
        onmessage: (msg, isPart) => {
          // _this.set(_this.message, id, currentMsg)
          if (isPart) {
            currentMsg.message += msg;
          } else {
            currentMsg.message = msg;
          }
          messages.splice(messages.length - 1, 1);
          messages.push(currentMsg);
          _this.$refs.messageList.scrollTop = _this.$refs.messageList.scrollHeight;
          // console.info(currentMsg.message)
        },
        onclose: () => {
          _this.loading = false;
          _this.saveHistory();
          console.info('close');
          if (_this.autoSpeech) {
            _this.speak();
          }
        },
        onerror: err => {
          debugger;
          _this.loading = false;
          console.info(err);
        },
      });
    },
    getAppInfo() {
      const data = Config.getData().data;
      const { name, ext } = data;
      this.name = name;
      document.title = this.name;
      if (ext) {
        const config = ext;
        const { default_prompt, auto_speech, welcome_text, show_profile_setting } = config;
        this.config = config;
        if (default_prompt) {
          this.prompt = default_prompt;
        }
        if (auto_speech ?? false) {
          this.autoSpeech = true;
          this.initSpeaker();
        }
        if (welcome_text && welcome_text.length > 0 && this.message.length === 0) {
          this.message.push({
            user: 'AI',
            message: config.welcome_text,
          });
        }
        this.showProfileSetting = show_profile_setting ?? false;
        this.initAIClient();
        console.info(config);
      }
    },
    recoveryHistory() {
      StorageApi.get(this.history.name).then(data => {
        if (data && data.data) {
          this.message = JSON.parse(data.data);
        }
      });
    },
    saveHistory() {
      if (this.message.length > this.maxHistory) {
        const tmpHistory = [];
        const start = this.message.length - this.maxHistory;
        const end = this.message.length;
        for (let id = start; id < end; id++) {
          tmpHistory.push(this.message[id]);
        }
        StorageApi.put(this.history.name, JSON.stringify(tmpHistory));
      } else {
        StorageApi.put(this.history.name, JSON.stringify(this.message));
      }
    },
    // 右上角图标 清空记录
    cleanHistory() {
      this.$confirm('是否清空所有生成记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.message = [];
          this.saveHistory();
          this.$message({
            type: 'success',
            message: '已清除!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作',
          });
        });
    },
    initSpeaker() {
      window.speechSynthesis.cancel();
      this.speech = new SpeechSynthesisUtterance();
      this.speech.onend = () => {
        console.log('语音播报结束');
        this.speaking = false;
      };
    },
    speak() {
      this.speaking = true;
      const content = this.message[this.message.length - 1].message;
      if (content && content.length > 1) {
        // var utterThis = new SpeechSynthesisUtterance(text);
        this.speech.text = content;
        console.info('speak ' + content);
        // speech.lang = 'zh';//汉语
        window.speechSynthesis.speak(this.speech);
      }
    },
    stop() {
      this.client.close();
    },
    // 文本拷贝
    copyAsPrompt(message) {
      return;
      console.log(message, 'messagemessage');
      this.prompt = message;
    },
    // // 服务器地址切换
    // handleSDServerTypeChange(type) {
    //   // 公共服务器
    //   if (type === "common") {
    //     debugger;
    //     this.sdServerUrl = this.config.common_sd_api;
    //   }
    //   this.saveConfig();
    // },
    // 私有本地服务器
    // saveConfig() {
    //   const config = JSON.parse(JSON.stringify(this.config));
    //   config.sdServerType = this.sdServerType;
    //   config.sdServerUrl = this.sdServerUrl;
    //   // config.sdServerType = this.sdServerType
    //   localStorage.setItem('ai-config', JSON.stringify(config));
    // },
    recoverConfig() {
      // debugger
      // 初始化塞入配置信息
      const config = localStorage.getItem('ai-config');
      if (config) {
        const configJSON = JSON.parse(config);
        this.config = configJSON;
        this.sdServerType = configJSON.sdServerType;
        this.sdServerUrl = configJSON.sdServerUrl;
        this.sdServerType = configJSON.sdServerType ?? 'common';

        const data = Config.getData().data;
        this.name = data.name;
        document.title = this.name;
        if (data.ext && data.ext.common_sd_api) {
          this.config.common_sd_api = data.ext.common_sd_api;
          this.sdServerUrl = data.ext.common_sd_api;
        }
      } else {
        this.getAppInfo();
        this.sdServerUrl = this.config.common_sd_api;
        this.sdServerType = 'common';
      }
    },

    getPods() {
      PodsApi.getPods().then(res => {});
    },
  },
  mounted() {
    this.id = this.$route?.params?.id;
    StorageApi.init(this.history.name).then(res => {
      this.recoveryHistory();
    });
    this.recoverConfig();
    // this.getAvatar()
    if (this.mode === 'draw') {
      this.prompt = this.default_prompt;
    }
    this.getPods();
  },
};
</script>

<style>
.text-wrapper {
  white-space: pre-wrap;
}
.vuepress-markdown-body {
  padding: 16px !important;
}
</style>
