import { fetchEventSource } from '@microsoft/fetch-event-source';
import Prompt from './prompt.js'

class OpenAI {

    constructor(config) {
        this.config = config
        this.abortController = null
        this.callback = null
        this.temperature = parseFloat(config?.temperature??0.7)
    }

    createCompletion (prompt, history, context, callback) {
        const config = this.config
       
        const abortController = new AbortController();
        const signal = abortController.signal;
        this.abortController = abortController

        this.callback = callback

        const mode = config?.mode??'chat'
        const token = config?.token??'empty'
        const url = config.api_url + (mode === 'chat' ? '/chat/completions' : '/completions')
        const stop = config?.stop??'[DONE]'
        const max_tokens = config?.api_max_token??512
        const model = config?.model??'vicuna-13b-all-v1.1'
        const temperature = this.temperature
        const top_p = config?.top_p??1.0
        let stop_key = config?.stop_key??null
        if (stop_key !== null && stop_key !== '') {
            stop_key = stop_key.split(';;')
        }
        const data = {
            model: model,
            max_tokens: parseInt(max_tokens),
            temperature: parseFloat(temperature),
            top_p: parseFloat(top_p),
            stream: true,
            stop: stop_key
            // prefix: prefix
        }
        if (mode === 'chat') {
            data.messages = Prompt.getPromptByChatMode(config, context, history)
        } else {
            data.prompt = Prompt.getPromptByTemplate(config, context, prompt)
        }
        // const prefix = config?.prompt_prefix??''
        const fetcher = fetchEventSource(url, {
            method: 'POST',
            signal: signal,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            onmessage(msg) {
                // if the server emits an error message, throw an exception
                // so it gets handled by the onerror callback below:
                if (msg && msg?.data) {
                    if (msg?.data === stop) {
                        if (callback?.onclose) {
                            callback?.onclose()
                        }
                        abortController.abort();
                        return

                    } else {
                        console.info(msg.data)
                        const jsonData = JSON.parse(msg.data)
                        // 和上面重复触发，只留一个
                        // if (jsonData.choices[0].finish_reason === 'stop') {
                        //     if (callback?.onclose) {
                        //         callback?.onclose()
                        //     }
                        //     return
                        //   }
                        let message = null
                        if (mode === 'chat') {
                            message = jsonData?.choices[0]?.message?.content
                            if (typeof message === 'undefined') {
                                message = jsonData?.choices[0]?.delta?.content
                            }
                            if (typeof message === 'undefined') { 
                                message = ''
                            }
                        } else {
                            message = jsonData?.choices[0]?.text
                        }
                        
                        callback?.onmessage(message, true)
                    }
                    
                }

                
                // if (msg.event === 'FatalError') {
                //     throw new FatalError(msg.data);
                // }
            },
            onclose() {
                if (callback?.onclose) {
                    callback?.onclose()
                }
                // if the server closes the connection unexpectedly, retry:
            },
            onerror(err) {
                if (callback?.onerror) {
                    callback?.onerror(err)
                }
            }
        });

    }

    close () {
        if (this.abortController) {
            this.abortController.abort()

            if (this.callback && this.callback?.onclose) {
                this.callback.onclose()
            }
        }
    }

}

export default OpenAI