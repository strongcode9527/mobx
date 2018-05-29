import isPlainObject from 'is-plain-object'


const proxies = new WeakMap()

function isObservable(obj) {
  return proxies.get(obj) === obj
}


const observers = new WeakMap()

const queueObservers = new Set()

export function observable(obj) {
  if(!isPlainObject(obj)) {
    throw new Error('必须使用纯对象')
  }



}


export function observe(func) {

}

               














