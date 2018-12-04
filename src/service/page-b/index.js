/* 
 * @Desc: 接口调用封装
    返回的是promise对象
 * @Author: Eleven 
 * @Date: 2018-10-30 15:36:04 
 * @Last Modified by: Eleven
 * @Last Modified time: 2018-12-04 15:59:00
 */

import $axios from 'utils/$axios'
import { isDev } from 'utils'

// 开发环境,url统一添加前缀,方便接口本地代理
const prev = isDev ? '/api' : ''

const service = {
  test() {
    const url = `${prev}/test`
    
    return $axios.get(url)
  },
  
}

export default service