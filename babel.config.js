/*
 * @Author: lijiake
 * @Date: 2022-04-03 07:44:16
 * @LastEditTime: 2022-04-03 07:45:45
 * @LastEditors: lijiake
 * @Description: 
 * @FilePath: /mini-vue/babel.config.js
 */
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};