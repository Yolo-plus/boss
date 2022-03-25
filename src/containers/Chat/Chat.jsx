import React, { Component } from 'react'
import { NavBar, List, Form, Input, Button } from 'antd-mobile'
import HeadImage from '../../components/HeadImage/HeadImage'
import { sendMsg, readMsg } from '../../redux/actions'
import { connect } from 'react-redux'

class Chat extends Component {
  state = {
    content: ''
  }

  handleSend = () => {
    let from = this.props.userStatus._id  // 发送方
    let to = this.props.match.params.id  // 接收方
    let content = this.state.content.trim()  // 发送的内容

    if (!content) {
      return;
    }

    this.props.sendMsg({ from, to, content })
    this.setState({ content: '' })
  }

  // 组件挂载后和组件更新后滚动到指定位置
  componentDidMount () {
    // 滚动到指定位置
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentDidUpdate () {
    window.scrollTo(0, document.body.scrollHeight)
    // 将消息设置为已读
    let id = this.props.match.params.id  // target id
    this.props.readMsg(id)
  }

  render() {
    let { users, chatMsgs } = this.props.chatList  // users是所有用户，chatMsgs是所有聊天数据

    let meID = this.props.userStatus._id  // 发送方id
    let targetID = this.props.match.params.id  // 接收方id
    let chatID = [meID, targetID].sort().join('_')  // 后端返回的数据只有一种样式，是通过排序决定顺序的，chat_id不能区分发送方和接收方
    // 赋一个初始值，防止报错（所以在reducers里面声明初始值有很大的好处）
    let msgs = chatMsgs ? chatMsgs.filter(item => item.chat_id === chatID) : []  // 筛选出当前对话
    let targetInfo = users ? users[targetID] : {}  // 对象名称和头像

    return (
      <div>
        <NavBar onBack={() => { this.props.history.goBack() }} className="css-chat-navbar" style={{ background: '#5dd5c8', color: 'white' }}>{ targetInfo.username }</NavBar>

        <List className='css-chat-list-father'>
          {
            msgs.map(item => {
              // 对方发消息
              if (item.from === targetID) {
                return (
                  <List.Item prefix={<HeadImage head={targetInfo.header} ></HeadImage>} className="css-chat-list" key={item._id}>
                    {item.content}
                  </List.Item>
                )
              // 我发消息
              } else {
                return (
                  <List.Item extra="我" className="css-chat-list css-chat-list-right" key={item._id}>
                    {item.content}
                  </List.Item>
                )
              }
            })
          }
        </List>

        {/* 收集发送内容 */}
        <Form layout='horizontal' className='css-chat-form'>
          <Form.Item
            extra={
              <div>
                <Button style={{ background: '#5dd5c8', color: 'white' }} onClick={this.handleSend}>发送</Button>
              </div>
            }
          >
            <Input placeholder='请输入内容' clearable onChange={val => { this.setState({ content: val }) }} value={this.state.content} />
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default connect(
  state => ({ userStatus: state.userStatus, chatList: state.chatList }),
  { sendMsg, readMsg }
)(Chat)