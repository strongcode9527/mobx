import isPlainObject from 'is-plain-object'


// 使用WeakMap 只接受对象作为键值 key

function isObservable(obj) {
  return proxies.get(obj) === obj
}




export function observable(obj) {
  if(!isPlainObject(obj)) {
    throw new Error('必须使用纯对象')
  }
  const observers = new WeakMap()
  const queueObservers = new Set()
  const proxies = new WeakMap()

  const dynamicObject = new Proxy(obj, {
    get(target, key, receiver) {
        const result = Reflect.get(target, key, receiver)
  
        // 如果取的值是对象，优先取代理对象
        const resultIsObject = typeof result === 'object' && result
        const existProxy = resultIsObject && proxies.get(result)
  
        // 如果获取的值为对象，继续进行代理
        if (currentObserver) {
            registerObserver(target, key)
            if (resultIsObject) {
                return existProxy || observable(result)
            }
        }
  
        return existProxy || result
    },
  
    set(target, key, value, receiver) {
      // 如果改动了 length 属性，或者新值与旧值不同，触发可观察队列任务
      if (key === 'length' || value !== Reflect.get(target, key, receiver)) {
          queueObservers(target, key)
      }
  
      // 如果新值是对象，优先取原始对象
      if (typeof value === 'object' && value) {
          value = value.$raw || value
      }
  
      return Reflect.set(target, key, value, receiver)
    },
  })

  return dynamicObject
}


export function observe(func) {
  if(typeof func !== 'function') {
    throw new Error('params must be function')
  }

  //初次执行，收集依赖。
  func()
  

}

              













