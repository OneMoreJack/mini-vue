class ReactiveEffect {
  private _fn: any

  constructor(fn) {
    this._fn = fn
  }

  run() {
    activeEffect = this
    return this._fn()
  }
}

const targetMap = new Map()
export function track(target, key) {
  let depMap = targetMap.get(target)
  if (!depMap) {
    depMap = new Map()
    targetMap.set(target, depMap)
  }

  let dep = depMap.get(key)
  if (!dep) {
    dep = new Set()
    depMap.set(key, dep)
  }

  dep.add(activeEffect)
}

export function trigger(target, key) {
  let depMap = targetMap.get(target)
  let dep = depMap && depMap.get(key)
  if (dep) {
    for (const effect of dep) {
      effect.run()
    }
  }
}

let activeEffect;
export function effect(fn) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
  return _effect.run.bind(_effect)
}