# mobx
实现一个类似于mobx的数据处理类库。并研究vue的数据处理原理

参考类库： https://github.com/nx-js/observer-util

本项目只是为了实现类mobx原理，学习其中内容。


为了简单的实现，使用proxy,以及reflect。



### 原理笔记


在mobx中autoRun是一个非常重要的api，可以利用这个api，开发出mobx-react.核心思想就是在组件外面包一层autoRun。一旦属性发生变化，就会立刻出发回调，组建直接触发forceUpdate。
在许多的博文中，直接踢出，mobx-react，其实是直接将react，vue化。


#### mobx有一个基本的行为就是依赖收集。

收集依赖主要是依靠 setter属性，来进行收集。所以，在初始化的时候会执行一遍autoRun以便来进行依赖收集。但也有一个问题那就是

```

if(...) {
    const name = obj.name
}


```

如果出现了条件表达式，依赖可能收集不全。
