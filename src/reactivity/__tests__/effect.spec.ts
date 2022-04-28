/*
 * @Author: lijiake
 * @Date: 2022-04-03 07:31:07
 * @LastEditTime: 2022-04-03 07:41:02
 * @LastEditors: lijiake
 * @Description: 
 * @FilePath: /mini-vue/src/reactivity/__tests__/index.spec.ts
 */
import { reactive } from '../reactive'
import { effect } from '../effect'

describe('effect', () => {
  it('happy path', () => {
    const user = reactive({
      age: 10
    })

    let nextAge;
    effect(() => {
      nextAge = user.age + 1
    })

    expect(nextAge).toBe(11)

    user.age++
    expect(nextAge).toBe(12)
  })
})