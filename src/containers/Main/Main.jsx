import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Yingpin from '../Yingpin/Yingpin'
import Zhaopin from '../Zhaopin/Zhaopin'
import YingpinPage from '../YingpinPage/YingpinPage'
import ZhaopinPage from '../ZhaopinPage/ZhaopinPage'
import Message from '../Message/Message'
import Personal from '../Personal/Personal'
import Footer from '../../components/Footer/Footer'
import { AppOutline, MessageFill, UserOutline } from 'antd-mobile-icons'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { getUser } from '../../redux/actions'
import { getRedirectPath } from '../../utils/handlePath'
import Chat from '../Chat/Chat'

class Main extends Component {
  navList = [
    {
      path: '/yingpinpage',
      component: YingpinPage,
      icon: <AppOutline />,
      title: '首页',
      headerText: 'BOSS'
    },
    {
      path: '/zhaopinpage',
      component: ZhaopinPage,
      icon: <AppOutline />,
      title: '首页',
      headerText: '求职者'
    },
    {
      path: '/message',
      component: Message,
      icon: <MessageFill />,
      title: '消息',
      headerText: '消息'
    },
    {
      path: '/personal',
      component: Personal,
      icon: <UserOutline />,
      title: '个人',
      headerText: '个人'
    }
  ]

  // 持久化登录：刷新的时候重新获取数据库数据（刷新：有内容->内容变为空->有内容，注意警惕内容变为空的时候，有可能某些地方会报错，这时候可以赋一个初始值）
  componentDidMount() {
    // 获取cookie
    let user_id = Cookies.get('userid')
    // 获取redux储存的id
    let _id = this.props.userStatus._id

    // 有cookie且保存的内容变为空
    if (user_id && !_id) {
      this.props.getUser()  // 请求数据并保存到redux
    }
  }

  render() {
    let { navList } = this
    let { pathname } = this.props.location  // 获取当前的路由，个人认为不需要判断是否是footer的四个路由之一然后才加上hidden，因为footer设置在其他页面都是隐藏的，然而在设置navbar和tarbar的时候可以用来判断是否是footer的四个路由之一进而加上navbar却很有效
    let currentNav = navList.find(item => item.path === pathname)
    let user_id = Cookies.get('userid')
    let { userStatus } = this.props

    // 应聘还是招聘
    if (userStatus.type === 'yingpin') {
      navList[1].hidden = true
    } else if (userStatus.type === 'zhaopin') {
      navList[0].hidden = true
    }

    // 没有cookie
    if (!user_id) {
      return <Redirect to="/login"></Redirect>
    }

    // 考虑到所有路由的情况
    if (pathname === '/') {
      let path = getRedirectPath(userStatus.type, userStatus.header)
      return <Redirect to={path}></Redirect>
    }

    return (
      <div>
        {currentNav ? <NavBar back={null} className="css-main-navbar" style={{ background: '#5dd5c8', color: 'white' }}>{currentNav.headerText}</NavBar> : ''}
        <div style={{ paddingTop: '45px', paddingBottom: '53px' }}>
          <Switch>
            <Route path='/yingpin' component={Yingpin}></Route>
            <Route path='/zhaopin' component={Zhaopin}></Route>
            <Route path='/chat/:id' component={Chat}></Route>

            {/* 底部四个导航页面 */}
            {
              navList.map(item => {
                return <Route path={item.path} component={item.component} key={item.path}></Route>
              })
            }
          </Switch>
        </div>
        {currentNav ? <Footer navList={navList}></Footer> : ''}
      </div>
    )
  }
}

export default connect(
  state => ({ userStatus: state.userStatus }),
  { getUser }
)(Main)
