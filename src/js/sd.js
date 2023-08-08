import axios from "axios";

export default {
    draw (config, prompt, negative_prompt) {
        return new Promise(function(resolve,rejcet){
            
            const data = {
                prompt: prompt,
                steps: config?.steps??20,
                negative_prompt: negative_prompt??'nsfw',
                width: config?.width??512,
                height: config?.height??512,
                cfg_scale: config?.cfg_scale??6,
                seed : config?.seed??-1,
                sampler_name: config?.sampler_name??"DPM++ SDE Karras"
            }
            const headers = { 
                'content-type': 'application/json'
            };
    
            let api = config?.sd_api
            if (api.indexOf('/sd') === -1) {
                api += '/sdapi/v1/txt2img'
            }
            axios.post(api, data, { headers }).then(response => {
    
                if (response.status === 200 && response?.data?.images){
                    const image = response?.data?.images[0]                    
                    resolve('data:image/png;base64,' + image)
                }
                
            }).catch(err => {
                rejcet(err)
            });

        })

        
        
    }

}