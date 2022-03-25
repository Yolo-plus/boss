import React, { Component } from 'react'
import { NavBar, Form, Input, Space, Radio, Button, Toast } from 'antd-mobile'
import { Logo } from '../../components/Logo/Logo'
import { connect } from 'react-redux'
import { register } from '../../redux/actions'
import { Redirect } from 'react-router-dom'
import { clearUserStatus } from '../../redux/actions'

class Register extends Component {
  state = {
    username: '',
    password1: '',
    password2: '',
    type: 'yingpin'
  }

  handleChange = (name, value) => {
    // 变量使用[]括起来
    this.setState({ [name]: value })
  }

  handleRegister = () => {
    if (this.state.username === '') {
      Toast.show({
        content: '用户名不能为空'
      })

      return;
    } else if (this.state.password1 === '' || this.state.password2 === '') {
      Toast.show({
        content: '密码不能为空'
      })

      return;
    } else if (this.state.password1 !== this.state.password2) {
      Toast.show({
        content: '密码不一致'
      })

      return;
    }

    this.props.register(this.state)
  }

  // 渲染方法应该是道具和状态的纯粹功能，不允许从渲染触发嵌套组件更新。如有必要，在componentDidUpdate中触发嵌套更新。
  componentDidUpdate() {
    let msg = this.props.userStatus.msg

    if (msg) {
      Toast.show({
        content: msg
      })

      // 清除msg
      this.props.clearUserStatus()
    }
  }

  render() {
    let { redirectPath } = this.props.userStatus

    // 有的话直接跳转了，redux不显示有数据
    if (redirectPath) {
      // 使用this.props.history.push()会报错
      // 信息完善就跳到yingpinpage或者zhaopinpage，信息不完善就跳到yingpin或者zhaopin
      return <Redirect to={redirectPath}></Redirect>
    }

    return (
      <div>
        <NavBar back={null} style={{ background: '#5dd5c8', color: 'white' }} className="css-reglog-navbar">BOSS直聘</NavBar>
        <Logo></Logo>
        <Form layout='horizontal' style={{ marginTop: '80px' }}>
          {/* <Space direction='vertical'> */}
          <Form.Item label='用户名'>
            {/* val可以直接获取输入框数据 */}
            <Input placeholder='请输入用户名' clearable onChange={(val) => { this.handleChange('username', val) }} />
          </Form.Item>
          <Form.Item label='密码'>
            <Input placeholder='请输入密码' clearable type='password' onChange={(val) => { this.handleChange('password1', val) }} />
          </Form.Item>
          <Form.Item label='确认密码'>
            <Input placeholder='请确认密码' clearable type='password' onChange={(val) => { this.handleChange('password2', val) }} />
          </Form.Item>
          <Form.Item label="用户类型">
            <Radio.Group>
              <Space direction='horizontal'>
                {/* Radio和取消手机端延迟代码有冲突 */}
                <Radio checked={this.state.type === 'yingpin'} style={{ color: 'rgb(102, 102, 102)' }} onChange={() => { this.handleChange('type', 'yingpin') }}>应聘者</Radio>
                <Radio checked={this.state.type === 'zhaopin'} style={{ color: 'rgb(102, 102, 102)' }} onChange={() => { this.handleChange('type', 'zhaopin') }}>招聘者</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          {/* </Space> */}
          <Space direction='vertical' block style={{ marginTop: '30px' }}>
            <Button block style={{ background: '#5dd5c8', color: 'white', height: '49.5px' }} onClick={this.handleRegister}>注册</Button>
            <Button block style={{ height: '49.5px' }} onClick={() => { this.props.history.push('/login') }}>已有账号？登录</Button>
          </Space>
        </Form>
      </div>
    )
  }
}

export default connect(
  state => ({ userStatus: state.userStatus }),
  { register, clearUserStatus }
)(Register)
