// import isPlainObject from 'is-plain-object'


// 使用WeakMap 只接受对象作为键值 key

// function isObservable(obj) {
//   return proxies.get(obj) === obj
// }


const observers = new WeakMap() // <object, Map<PropertyKey, Set<Observer>>>()
// const queueObservers = new Set()
const proxies = new WeakMap()

let currentObserver // 用于记录observe的回调函数，便于依赖收集时回掉函数的记录

function registerObserver(target, key) {
  const observerMap = observers.get(target)
  if (observerMap) {
    let observerFuncs = observerMap.get(key)

    if (!observerFuncs) {
      const set = new Set()
      observerMap.set(key, set)
      observerFuncs = set
    }

    observerFuncs.add(currentObserver)
    observerMap.set(key, observerFuncs)
  } else {
    const map = new Map()
    const set = new Set()
    set.add(currentObserver)
    map.set(key, set)
    observers.set(target, map)
  }
}

function queueObservers(target, key) {
  ((observers.get(target) && observers.get(target).get(key)) || []).forEach(func => func())
}


export function observable(obj) {
  // if (!isPlainObject(obj)) {
  //   throw new Error('必须使用纯对象')
  // }


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
        Reflect.set(target, key, value, receiver)
        queueObservers(target, key)
      }
      return true
    },
  })

  proxies.set(obj, dynamicObject)

  return dynamicObject
}


export function observe(func, updateFunc) {
  if (typeof func !== 'function') {
    throw new Error('params must be function')
  }

  // 初次执行，收集依赖。
  currentObserver = updateFunc

  func()

  currentObserver = undefined
}
