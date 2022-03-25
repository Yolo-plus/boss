import React, { Component } from 'react'
import { List, Space, Avatar, AutoCenter } from 'antd-mobile'

export default class HeadSelect extends Component {
  constructor(props) {
    super(props)

    // 保存头像地址
    this.headlist = []

    for (let i = 1; i <= 5; i++) {
      // 使用require获得头像
      this.headlist.push({
        name: `头像${i}`,
        icon: require(`../../assets/images/头像${i}.png`)
      })
    }

    this.state = {
      icon: ''
    }
  }

  handleClick = (name, icon) => {
    this.setState({icon: icon})  // 更新头像
    this.props.setHead(name)  // 传递名称给父组件
  }

  render() {
    return (
      <div>
        <List header="请选择头像"></List>
        <AutoCenter style={{ marginTop: '30px', marginBottom: '30px' }}>
          <Space block wrap style={{ '--gap': '16px' }}>
            {
              this.headlist.map(item => {
                return <Avatar src={item.icon} key={item.name} onClick={() => {this.handleClick(item.name, item.icon)}}/>
              })
            }
          </Space>

          <AutoCenter style={{marginTop: '30px'}}>
            <Avatar src={this.state.icon} style={{'--border-radius': '50%', '--size': '80px'}}/>
          </AutoCenter>
        </AutoCenter>
      </div>
    )
  }
}
