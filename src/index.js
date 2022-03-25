import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

// 直接在入口文件使用路由，没有根组件，根据是否登录跳转到对应的界面
import Register from './containers/Register/Register'
import Login from './containers/Login/Login'
import Main from './containers/Main/Main'

import { Provider } from 'react-redux'
import store from './redux/store'
import './assets/css/common.css'

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        {/* <Route component={Main}></Route> */}
        <Route path="/" component={Main}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </HashRouter>
  </Provider>
), document.querySelector('#root'))