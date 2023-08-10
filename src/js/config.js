export default {
  getData() {
    return {
      code: 200,
      data: {
        id: 128897,
        name: 'AI绘图',
        create_time: 1684920670901,
        app: 'llm_rep',
        resource_type: 'app',
        ext: {
          mode: 'chat',
          model: 'vicuna-7b-all-v1.1',
          api_url: '',
          api_type: 'openai',
          robot_img: null,
          api_max_token: '1024',
          default_prompt: 'cat',
          max_request_len: '10000',
          user_call_name:'', // ai称呼当前名称
          prompt_template: '',
          api_prompt_prefix: '',
          show_profile_setting: false,
          common_sd_api: 'https://gpu-pod64d32e0ea825d265df096e6f-6006.node.inscode.run',
        },
      },
      message: 'success',
    };
  },
};
