/*
createStore用来创建redux的store。store用来保存应用的状态树，并提供了
dispatch、getstate等方法来操作状态。
combineReducers是一个辅助函数，用于将多个reducer合并成一个rootReducer。
每一个reducer负责更新应用状态树中的一部分。
*/
import {
  createStore,
  combineReducers,
  applyMiddleware,
  Middleware,
} from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";

// rootReducer是一个将所有reducer合并后的函数，它控制整个应用的状态树。
const rootReducer = combineReducers({
  auth: authReducer,
});

// 创建store,来管理所有的应用状态
const store = createStore(rootReducer, applyMiddleware(thunk as Middleware));

//  RootState 通常是整个 Redux store 的状态类型
export type RootState = ReturnType<typeof rootReducer>; 
// 导出store, 方便component和hook引入，并于redux进行交互。
export default store;
