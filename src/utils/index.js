/* 
 * @Desc: 工具函数
 * @Author: Eleven 
 * @Date: 2018-10-31 17:35:30 
 * @Last Modified by: Eleven
 * @Last Modified time: 2018-10-31 17:36:17
 */

// 是否为本地开发环境
export const isDev = process.env.REACT_APP_BUILD_ENV === 'development' ? true : false

// 是否为测试环境
export const isTest = process.env.REACT_APP_BUILD_ENV === 'test' ? true : false

// 是否为生产环境
export const isProd = process.env.REACT_APP_BUILD_ENV === 'production' ? true : false

// 根域名(已区分环境)
export const BASE_URL = process.env.REACT_APP_BASE_URL