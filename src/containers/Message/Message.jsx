import React, { Component } from 'react'
import { List, Avatar, Badge } from 'antd-mobile'
import { connect } from 'react-redux'
import { readMsg } from '../../redux/actions'

function getLastMsgs(chatMsgs = []) {
  let lastMsgs = {}  // 保存和其他用户聊天最新消息的对象

  chatMsgs.forEach(item => {
    let chat_id = item.chat_id  // 区别不同用户
    let lastMsg = lastMsgs[chat_id]  // 是否已经保存有相同id的数据

    if (!lastMsg) {
      // 还没有保存过
      lastMsgs[chat_id] = item
    } else {
      // 已经保存有相同id的数据，如果时间往后的话赋新值
      if (item.create_time > lastMsg.create_time) {
        lastMsgs[chat_id] = item
      }
    }
  })

  // 将对象转化为数组
  let lastMsgsArr = Object.values(lastMsgs)

  // 不同组之间排个序
  lastMsgsArr.sort((a, b) => {
    return b.create_time - a.create_time
  })

  return lastMsgsArr
}

class Message extends Component {
  // 清除徽章并跳转
  itemClick = (id) => {
    this.props.readMsg(id)
    this.props.history.push(`/chat/${id}`)
  }

  render() {
    let { users, chatMsgs } = this.props.chatList
    let { userStatus } = this.props

    // 获取和其他用户聊天最新消息排序后的数组
    let lastMsgs = getLastMsgs(chatMsgs)

    return (
      <div>
        <List>
          {
            lastMsgs.map(item => {
              let id = userStatus._id === item.from ? item.to : item.from  // 目标id
              let targetInfo = users[id]  // 目标信息
              let count = 0

              // 徽标
              chatMsgs.forEach(item => {
                if (item.to === userStatus._id && item.from === id) {
                  // 未读消息数量
                  if (!item.read) {
                    count++
                  }
                }
              })

              return (
                <List.Item
                  prefix={<Badge content={this.props.readMsgs > 0 ? null : (count === 0 ? null : count)}><Avatar src={targetInfo.header ? require(`../../assets/images/${targetInfo.header}.png`) : require('../../components/HeadImage/images/block.webp')} /></Badge>}
                  description={item.content}
                  key={item._id}
                  onClick={() => { this.itemClick(id) }}
                >
                  {targetInfo.username}
                </List.Item>
              )
            })
          }
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({ userStatus: state.userStatus, chatList: state.chatList, readMsgs: state.readMsg }),
  { readMsg }
)(Message)
