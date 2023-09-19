import axios from 'axios';

export default {
  draw(config, prompt, negative_prompt) {
    return new Promise(function (resolve, rejcet) {
      const data = {
        prompt: prompt,
        steps: config?.steps ?? 20,
        negative_prompt: negative_prompt ?? 'nsfw',
        width: config?.width ?? 512,
        height: config?.height ?? 512,
        cfg_scale: config?.cfg_scale ?? 6,
        seed: config?.seed ?? -1,
        // 取样器类型
        sampler_name: config?.sampler_name ?? 'DPM++ SDE Karras',
      };
      // Euler a, Euler, LMS, Heun, DPM2, DPM2 a, DPM++ 2S a, DPM++ 2M, DPM++ SDE, DPM fast, DPM adaptive, LMS Karras, DPM2 Karras, DPM2 a Karras, DPM++ 2S a Karras, DPM++ 2M Karras, DPM++ SDE Karras, DDIM, PLMS
      //     Euler a：10步开始成型，但20步时的五官还是有瑕疵，30步就没什么问题了。
      // 　　Euler：10步开始已经不错，但五官有问题，20步已经没什么问题，往后看不出变化。
      // 　　LMS：到30步还是十分抽象，色块较多。
      // 　　Heun：10步开始成型，五官有瑕疵，20步效果没问题，30步主体细节上有变化。
      // 　　DPM2：10步开始成型，五官有瑕疵，20步效果没问题，30步背景细节上有变化。
      // 　　DPM2 a：都比较抽象，而且整体变化很大。
      // 　　DPM++ 2S a：10步开始成型，20步和30步效果都不错，而且画面变化幅度不少。颜色饱和度较低。
      // 　　DPM++ 2M：10步的色块还是挺严重，20步基本成型，30步的细节有了进一步的提高。
      // 　　DPM++ SDE：10步开始定型，20步成型，30步背景变化和主体细节增加。
      // 　　DPM fast：抽象派大师
      // 　　DPM adaptive：10步已经做好了，后面变化十分微小。
      // 　　LMS Karras：到30步还是有点挣扎。
      // 　　DPM2 Karras：10步还是有点抽象，20步成型，30步的主体细节又有了变化。
      // 　　DPM2 a Karras：10步还是很抽象，20步继续走样，30步成型但脸部还是有点崩。
      // 　　DPM++ 2S a Karras：10步的脸和颜色都不对，20步开始成型，30步细节上又有了变化，整体颜色饱和度低
      // 　　DPM++ 2M Karras：10步还是有点破碎，20步基本成型，30步在背景细节上有变化。
      // 　　DPM++ SDE Karras：10步虽然颜色不对，但除了脸都挺成熟了，20步成型，30步细节进一步加强。
      // 　　DDIM：10步成型，20步仍有微瑕，30步成熟。
      // 　　PLMS：一个逐步迈向现实的抽象派大师。
      const headers = {
        'content-type': 'application/json',
      };

      let api = config?.sd_api;
      if (api.indexOf('/sd') === -1) {
        api += '/sdapi/v1/txt2img';
      }
      axios
        .post(api, data, { headers })
        .then(response => {
          if (response.status === 200 && response?.data?.images) {
            const image = response?.data?.images[0];
            resolve('data:image/png;base64,' + image);
          }
        })
        .catch(err => {
          rejcet(err);
        });
    });
  },
};
