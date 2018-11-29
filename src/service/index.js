/* 
 * @Desc: 接口调用封装
    返回的是promise对象
 * @Author: Eleven 
 * @Date: 2018-10-30 15:36:04 
 * @Last Modified by: Eleven
 * @Last Modified time: 2018-11-28 15:00:37
 */

import $axios from './$axios'

const service = {
  test() {
    const url = ``
    
    return $axios.get(url)
  },
}

export default service