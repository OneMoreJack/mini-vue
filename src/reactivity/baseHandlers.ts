import { track, trigger } from "./effect"
import { ReactiveFlags } from "./reactive"

export function createSetter() {
  return function setter(target: any, key: string | symbol, value: any) {
    Reflect.set(target, key, value)
    trigger(target, key)
    return true
  }
}

export function createGetter(isReadonly = false) {
  return function getter(target: any, key: string | symbol) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }
    
    const value = Reflect.get(target, key)
    if (!isReadonly) {
      track(target, key)
    }
    return value
  }
}

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

export const mutableHandlers = {
  get,
  set
}

export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`target 不可执行 set 操作`, target)
    return true
  }
}
