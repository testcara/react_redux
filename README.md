# react_blog_redux

1. create basic project ```npx create-react-app my-app --typescript --scripts-version 5.0.1```
2. install the redux related ```npm install redux@4.x react-redux@7.x redux-thunk@2.x``` and ```@types/redux @types/react-redux @types/redux-thunk```
3. install the api related ```npm install --save-dev axios@^0.27.2 @types/axios@^0.14.0```

知识点：
1. redux action 描述发生了什么事。它的作用是通知应用的状态应该发生什么变化。一个action对象
必须至少包含type+payload。
1. redux reducer 纯函数，负责根据不同的action更新应用的状态。 它根据收到的action对象的type来决定如何更新状态。每个reducer函数接收两个参数（当前的状态state, 通过dispatch触发的action），返回值为一个新的状态。不要直接修改原始的state，而应该返回一个新对象。
2. redux dispatch 是用来发送action的方法。当需要触发一个state更新时，会通过dispatch来派发一个action, action会被传递给reducer进行处理。通常我们在组件中通过usedispatch来获取dispatch发放，然后用它来发送action。
3. redux selector是用于从redux store中读取数据。
4. redux thunk是一个中间件，允许我们在action creator中编写异步操作。函数的参数通常是dispatch和getstate。
5. provider 是一个react组件，它让redux store在整个应用中可用。它会将redux store注入到上下文中，使得任何地方的组件都可以通过useDispatch和useSelector来访问redux store。通常在应用的跟组件中使用provider来包裹整个应用。

这次用的技术栈：
react + typescript + patternfly + axios + redux store + redux thunk + api server + file database +  localstorage log

我们这里仍然用到了usehook， 在usehook里dispatch thunk action， 避免了在page或者component多次使用调用dispatch和selector。