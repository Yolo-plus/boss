import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'

// 在非路由组件使用路由库的api
import { withRouter } from 'react-router-dom'

class Footer extends Component {

  render() {
    let navList = this.props.navList
    let { pathname } = this.props.location

    // 过滤hidden为true的tabbar
    navList = navList.filter(item => !item.hidden)

    return (
      // activeKey设置当前激活 item 的 key（如果当前路由等于该item的路由就激活）
      // onChange事件可以直接获取当前的key
      <TabBar activeKey={pathname} onChange={value => { this.props.history.replace(value) }}>
        {
          navList.map(item => (
            <TabBar.Item icon={item.icon} title={item.title} key={item.path} className="demo"></TabBar.Item>
          ))
        }
      </TabBar>
    )
  }
}

export default withRouter(Footer)