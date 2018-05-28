import isPlainObject from 'is-plain-object'

export function observable(obj) {
  if(!isPlainObject(obj)) {
    throw new Error('必须使用纯对象')
  }
}

export function observe() {

}

                           


console.log('in')
