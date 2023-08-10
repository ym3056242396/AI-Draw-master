/*
 * @Author: 星野梦美
 * @Date: 2023-08-08 18:39:20
 * @LastEditors: 174050379@qq.com
 * @LastEditTime: 2023-08-10 14:41:06
 */
const default_max_token = 1024

const getContextContent = (context, max_token=default_max_token) => {
    if (context && context.length > 0) {
        let id = 0
        let len = context.length
        let contextContent = ''
        while(contextContent.length < max_token && id < len) {
            if (context[id].page_content.length + contextContent.length < max_token) {
                contextContent  = contextContent + '\n' + context[id].page_content
            }
            id++
        }
        return contextContent
    } else {
        return ''
    }
}

export default {
    
    getPromptByTemplate: (config, context, prompt, history) => {

        if (config.api_prompt_prefix) {
            prompt = config?.api_prompt_prefix + ' ' + prompt
        }
        if (config?.prompt_template) {

            const contextContent = getContextContent(context, config?.max_request_len??1024)
            return config?.prompt_template.replace(/\{question\}/ig, prompt).replace(/\{context\}/ig, contextContent)
        } else {
            return prompt
        }
    },
    getPromptByChatMode (config, context, history) {

        const history_length = Math.min(Math.max(parseInt(config?.history_length??4), 4), 10)
        let message = []
        if (history && history.length >= 2) {
            const end = history.length - 2 // 结束位置
            const start = Math.max(history.length - 2 - history_length + 1, 0) // 开始位置
            for(let id = start; id <= end; id++) {
                const item = history[id]
                message.push({
                    "role": item.user === 'AI' ? "system" : "user",
                    "content": item.message
                })
            }
        }
        if (config?.prompt_template) {
            const contextContent = getContextContent(context, config?.max_request_len??1024)
            message.unshift({
                "role": "user",
                "content": config.prompt_template.replace(/\{question\}/ig, '').replace(/\{context\}/ig, contextContent).replace(/\{user_call_name\}/ig, config.user_call_name)
            })
        }
        return message
    }
}