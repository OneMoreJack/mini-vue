/*
 * @Author: lijiake
 * @Date: 2022-04-03 07:55:17
 * @LastEditTime: 2022-04-03 07:55:17
 * @LastEditors: lijiake
 * @Description: 
 * @FilePath: /mini-vue/src/reactivity/reactive.ts
 */
import { track, trigger } from './effect'

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const value = Reflect.get(target, key)
      track(target, key)
      return value
    },
    set(target, key, value) {
      Reflect.set(target, key, value)
      trigger(target, key)
      return true
    }
  })
}
