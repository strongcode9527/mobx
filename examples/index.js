import { observable, observe} from '../src/index.js'
























const counter = observable({ num: 0 })
const countLogger = observe(() => console.log(counter.num))

// this calls countLogger and logs 1
counter.num++













