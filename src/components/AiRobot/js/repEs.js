/*
 * @Author: 金冠成 222736
 * @Date: 2023-12-26 10:44:19
 * @LastEditors: 174050379@qq.com
 * @LastEditTime: 2023-12-26 10:44:26
 */
import axios from "axios";


class RepEs {

    constructor(config) {
        this.config = config
        this.index_url = config.index_url
        this.index_name = config.index_name
        this.url = this.index_url + '?index_name=' + this.index_name
    }

    query (keyword) {

        const url = this.url
        return new Promise(function(resolve,rejcet){
            axios.get(url,{
                params: {
                    keyword: encodeURI(keyword),
                }
            }).then(res => {

                if (res?.status === 200 && res?.data?.code === 200) {
                    const result = []
                    res?.data?.data?.hits.forEach(element => {
                        result.push({
                            page_content: element?._source?.content
                        })
                    });
                    resolve(result)

                }
                console.info(res)


            }).catch((err) => {
                console.error(err)
                rejcet()
            })
        })
        
    }

}

export default RepEs