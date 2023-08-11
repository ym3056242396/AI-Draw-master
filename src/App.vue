<template>
  <div class="w-full h-screen">
    <!-- toolbar -->
    <div class="w-full h-14 pt-2 border-b-2 text-center fixed">
      <!-- 窗口左上角HOME图标 -->
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
    <div class="flex w-full h-full pt-14">
      <div class="flex-auto p-2 sm:p-8" style="background: #f4f4f4">
        <!-- TODO :整体背景板 -->
        <div
          class="w-full h-full m-auto relative container max-w-6xl rounded-xl"
          style="background: #fff"
        >
          <div
            class="w-full h-full pb-24 p-4 overflow-y-auto overflow-x-hidden"
            style="padding-bottom: 20rem"
            ref="messageList"
          >
            <div v-for="(item, index) in message" :key="index" style="margin-bottom: 2rem">
              <div v-if="item.user === 'User'">
                <div class="flex flex-row-reverse">
                  <!-- 聊天框  -->
                  <div
                    class="text-gray-700 p-4 mx-2 w-fit max-w-2xl 2xl:max-w-4xl rounded-lg cursor-pointer"
                    style="background: rgba(39, 228, 123, 0.46)"
                    v-html="item.message"
                  ></div>
                </div>
              </div>
              <div v-else class="flex">
                <div
                  class="bg-slate-50 text-gray-700 p-4 mx-2 w-fit max-w-2xl 2xl:max-w-4xl rounded-lg text-wrapper"
                >
                  <template v-if="item?.viewMode ?? 'chat' === 'image'">
                    <img :src="item.img" v-if="item.img" @click="download(item.img)" />
                    <img v-else src="/loading.gif" class="w-[512px]" />
                  </template>

                  <template>
                    {{ item.message ? item.message : '...' }}
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-full absolute bottom-0 bg-slate-50 h-22 py-2 px-2 rounded flex flex-col text-sm"
            style="border-top: 2px solid #f4f4f4; background: #fff"
          >
            <el-form size="mini" ref="form" :model="form" label-width="150px">
              <!-- v-if="mode === 'draw'" -->
              <el-form-item label="生成图片关联词：">
                <el-input
                  v-model="prompt"
                  placeholder="AI生成提示词(目前只支持英文输入)"
                ></el-input>
              </el-form-item>

              <el-form-item label="逆向敏感词汇：">
                <el-input
                  v-model="negative_prompt"
                  placeholder="逆向提示词(目前只支持英文输入)"
                ></el-input>
              </el-form-item>

              <el-form-item label="图片分辨率：">
                <div>
                  <el-select v-model="height" placeholder="请选择分辨率" @change="widthChange">
                    <el-option
                      v-for="item in imgSize"
                      :key="item.id"
                      :label="item.width + '*' + item.height"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
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
                <!-- <el-slider v-model="steps" :step="20" show-stops> </el-slider> -->
                  <el-slider v-model="steps"></el-slider>
              </el-form-item>
              <div style="display: flex">
                <!-- 切换AI类型 -->
                <el-select v-model="mode" placeholder="AI类型" @change="modeImageChange">
                  <el-option
                    :disabled="item.id === 2 || item.id === 3"
                    v-for="item in options"
                    :key="item.id"
                    :label="item.content"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-button type="primary" style="width: 100%; z-index: 9999; background:#409eff;" @click="query">提 交</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OpenAI from './js/openai.js';
import Config from './js/config.js';
import SDApi from './js/sd.js';
import StorageApi from './js/storage.js';
import PodsApi from './js/pod.js';

// https://github.com/ravenq/markdown-it-vue
// const DataServe = new Data()
export default {
  name: 'LlmApp',
  components: {},
  data() {
    return {
      id: 0,
      name: '加载中...',
      mode: 'draw', // image chat chart-bubble  //默认类型
      message: [],
      client: null,
      prompt: '',
      config: {},
      sdServerType: 'common',
      // 本地服务器地址
      sdServerUrl: 'https://gpu-pod64d32e0ea825d265df096e6f-6006.node.inscode.run',
      loading: false,
      maxHistory: 200,
      speaking: false, // 是否正在输出语音
      autoSpeech: false, // 是否自动开始语音
      speech: null, // 语音object
      options: [
        { content: '绘图模式', value: 'draw', id: 1 },
        { content: '聊天模式', value: 'chat', id: 2 },
        // { content: '自动模式', value: 'auto', id: 3 },
      ],
      showProfileSetting: false, //是否显示角色设置模块
      // 生成图片高宽
      width: 512,
      height: 512,
      imgSize: [
        { width: 512, height: 512, id: 0 },
        { width: 800, height: 600, id: 1 },
        { width: 1024, height: 768, id: 2 },
        { width: 1280, height: 600, id: 3 },
        { width: 1280, height: 1024, id: 4 },
        { width: 1366, height: 768, id: 5 },
        { width: 2560, height: 1600, id: 6 },
      ],
      steps: 20, // 绘制精度 （越高越浪费资源）
      sampler: 'DPM++ SDE Karras', // 采集器类型
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
    modeImageChange(val) {
      if (val === 'chat') {
        this.showProfileSetting = true;
      } else [(this.showProfileSetting = false)];
    },
    widthChange(val) {
      const itmm = this.imgSize.find(v => {
        return val === v.id;
      });
      const { width, height } = itmm;
      this.width = width;
      this.height = height;
    },

    download(url) {
      var a = document.createElement('a');
      var event = new MouseEvent('click');
      a.download = 'ElvesAiImg';
      a.href = url;
      a.dispatchEvent(event);
    },

    // 初始化 获取ai机器人配置
    initAIClient() {
      this.client = new OpenAI(this.config);
    },
    query() {
      const _this = this;
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
      if (_this.width > 800) {
        _this
          .$confirm('当前选择分辨率过大,概率会生成失败, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            if (_this.mode === 'draw') {
              _this.draw();
            } else {
              // _this.getAnswer();
            }
          })
          .catch(() => {
            _this.$message({
              type: 'info',
              message: '取消操作',
            });
          });
      } else {
        if (_this.mode === 'draw') {
          _this.draw();
        } else {
          // _this.getAnswer();
        }
      }
    },

    scrollBottom() {
      const _this = this;
      this.$nextTick(() => {
        _this.$refs.messageList.scrollTop = _this.$refs.messageList.scrollHeight + 20;
      });
    },

    //  获取
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
      // this.scrollBottom();
      const config = JSON.parse(JSON.stringify(this.config));
      config.width = this.width;
      config.height = this.height;
      config.steps = this.steps;
      config.sampler = this.sampler;
      config.sd_api = this.sdServerUrl;
      // 开始调用生成图片接口
      SDApi.draw(config, query, negative_prompt)
        .then(res => {
          _this.loading = false;
          console.info('close');
          currentMsg.img = res;
          messages.splice(messages.length - 1, 1);
          messages.push(currentMsg);
          // _this.scrollBottom();
          _this.saveHistory();
        })
        .catch(err => {
          _this.loading = false;
        });
    },
    // 聊天或其他模式  暂时没有api接口
    getAnswer(context) {
      // this.loading = true;
      // const _this = this;
      // let messages = this.message;
      // let currentMsg = {
      //   user: 'AI',
      //   message: '',
      // };
      // messages.push({ user: 'User', message: this.prompt });
      // console.log('messages',messages)
      // // messages.push(currentMsg);
      // _this.$refs.messageList.scrollTop = _this.$refs.messageList.scrollHeight;
      // const newPrompt = _this.prompt;
      // _this.prompt = '';
      // _this.client.createCompletion(newPrompt, _this.message, context, {
      //   onmessage: (msg, isPart) => {
      //     if (isPart) {
      //       currentMsg.message += msg;
      //     } else {
      //       currentMsg.message = msg;
      //     }
      //     messages.splice(messages.length - 1, 1);
      //     // messages.push(currentMsg);
      //     _this.$refs.messageList.scrollTop = _this.$refs.messageList.scrollHeight;
      //   },
      //   onclose: () => {
      //     _this.loading = false;
      //     _this.saveHistory();
      //     console.info('close');
      //     if (_this.autoSpeech) {
      //       _this.speak();
      //     }
      //   },
      //   onerror: err => {
      //     _this.loading = false;
      //     console.info(err);
      //   },
      // });
    },
    getAppInfo() {
      const data = Config.getData().data;
      const { name, ext } = data;
      this.name = name;
      document.title = this.name;
      if (ext) {
        const TempConfig = ext;
        const { default_prompt, auto_speech, welcome_text, show_profile_setting } = ext;
        this.config = TempConfig;
        //  初始化默认搜索内容
        if (default_prompt) {
          // this.prompt = default_prompt;
        }
        if (auto_speech ?? false) {
          this.autoSpeech = true;
          this.initSpeaker();
        }
        if (welcome_text && welcome_text.length > 0 && this.message.length === 0) {
          this.message.push({
            user: 'AI',
            message: welcome_text,
          });
        }
        this.showProfileSetting = show_profile_setting ?? false;
        // this.initAIClient();
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
    // 清空记录
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
    // 停止
    stop() {
      this.client.close();
    },
    // 初始化塞入配置信息
    recoverConfig() {
      this.$nextTick(() => {
        this.getAppInfo();
        this.sdServerUrl = this.config.common_sd_api;
        this.sdServerType = 'common';
      });
    },
    getPods() {
      PodsApi.getPods().then(res => {});
    },
  },
  mounted() {
    this.id = this.$route?.params?.id;
    StorageApi.init(this.history.name).then(res => {
      console.log(res, 'res', this.history.name);
      this.recoveryHistory();
    });

    this.recoverConfig();
    // 聊天模式默认展示搜索内容
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
