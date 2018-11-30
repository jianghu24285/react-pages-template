/* 
 * @Desc: webpack多页构建相关工具函数
    1.自动扫描入口js,生成entry入口配置;
    2.自动扫描html模版,生成new HtmlWebpackPlugin()配置;
    
 * @Author: Eleven 
 * @Date: 2018-11-30 16:48:10 
 * @Last Modified by: Eleven
 * @Last Modified time: 2018-11-30 18:03:40
 */

const path = require('path')
const glob = require('glob')
const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * 获取文件名
 * @param {String} filesPath 文件目录
 * @returns {Array} 文件名列表
 */
const getFilesName = (filesPath) => {
  let files = glob.sync(filesPath)
  let obj = []
  let entry, basename, extname

  for (let i = 0; i < files.length; i++) {
      entry = files[i]
      extname = path.extname(entry) // 扩展名 eg: .html
      basename = path.basename(entry, extname) // 文件名 eg: index
      obj.push(basename)
  }
  return obj
}

/**
 * 打包入口
 *  1.允许文件夹层级嵌套;
 *  2.入口js的名称不允许重名;
 */
const entries = getFilesName('src/views/**/*.js')

/**
 * 页面的模版
 *  1.允许文件夹层级嵌套;
 *  2.html的名称不允许重名;
 */
const templates = getFilesName('public/template/**/*.html')

/**
 * 获取webpack.config.dev.js的entry入口列表:
 *  1.允许文件夹层级嵌套;
 *  2.入口的名称不允许重名;
 * 
 * @returns {Object} entry 入口列表(对象形式)
 */
const getEntriesDev = () => {
  let entry = {}

  entries.forEach(fileName => {
      entry[fileName] = [
        require.resolve('./polyfills'),
        require.resolve('react-dev-utils/webpackHotDevClient'),
        `${paths.appViews}/${fileName}.js`,
      ]
  })
  return entry
}

/**
 * 获取webpack.config.prod.js的entry入口列表:
 *  1.允许文件夹层级嵌套;
 *  2.入口的名称不允许重名;
 * 
 * @returns {Object} entry 入口列表(对象形式),不包含vendor和manifest
 */
const getEntriesProd = () => {
  let entry = {}

  entries.forEach(fileName => {
      entry[fileName] = [
        require.resolve('./polyfills'),
        `${paths.appViews}/${fileName}.js`,
      ]
  })
  return entry
}

/**
 * 根据public/template目录下html模版,生成webpack.config.dev.js的plugins下new HtmlWebpackPlugin()配置
 * @returns {Array} new HtmlWebpackPlugin()列表
 */
const getHtmlWebpackPluginsDev = () => {
  let htmlWebpackPlugins = []
  let setting = null

  templates.forEach((fileName) => {
    setting = {
      filename: `${fileName}.html`,
      template: `${paths.appPublicTemplate}/${fileName}.html`,
      inject: false // js插入的位置，true/'head'/'body'/false
    }

    // (仅)有入口的模版自动引入资源
    if (fileName in getEntriesDev()) {
      setting.chunks = [fileName]
      setting.inject = true
      // setting.favicon = './src/assets/img/favicon.ico'
      // setting.hash = true
    }
    htmlWebpackPlugins.push(new HtmlWebpackPlugin(setting))
    setting = null
  })

  return htmlWebpackPlugins
}

/**
 * 根据public/template目录下html模版,生成webpack.config.prod.js的plugins下new HtmlWebpackPlugin()配置
 * @returns {Array} new HtmlWebpackPlugin()列表
 */
const getHtmlWebpackPluginsProd = () => {
  let htmlWebpackPlugins = []
  let setting = null

  templates.forEach((fileName) => {
    setting = {
      filename: `${fileName}.html`,
      template: `${paths.appPublicTemplate}/${fileName}.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: false // js插入的位置，true/'head'/'body'/false
    }

    // (仅)有入口的模版自动引入资源
    if (fileName in getEntriesProd()) {
      setting.chunks = ['manifest', 'vendor', fileName]
      setting.inject = true
      // setting.favicon = './src/assets/img/favicon.ico'
      // setting.hash = true
    }
    htmlWebpackPlugins.push(new HtmlWebpackPlugin(setting))
    setting = null
  })

  return htmlWebpackPlugins
}

module.exports = {
  entries,  // 入口文件列表
  templates,  // html模版列表
  getEntriesDev,  // 生成dev环境entry入口配置
  getEntriesProd, // 生成prod环境entry入口配置
  getHtmlWebpackPluginsDev, // 生成dev环境html-webpack-plugin配置
  getHtmlWebpackPluginsProd,  // 生成prod环境html-webpack-plugin配置
}