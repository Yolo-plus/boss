import React, { Component } from 'react'
import { NavBar, Form, Input, Space, Button, Toast } from 'antd-mobile'
import { Logo } from '../../components/Logo/Logo'
import { login } from '../../redux/actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { clearUserStatus } from '../../redux/actions'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (name, val) => {
    this.setState({ [name]: val })
  }

  handleLogin = () => {
    if (!this.state.username) {
      Toast.show({
        content: '用户名不能为空'
      })

      return;
    } else if (!this.state.password) {
      Toast.show({
        content: '密码不能为空'
      })

      return;
    }

    this.props.login(this.state)
  }

  // 状态更新
  componentDidUpdate() {
    let { msg } = this.props.userStatus

    if (msg) {
      Toast.show({
        content: msg
      })

      this.props.clearUserStatus()  // 清空userStatus
    }
  }

  render() {
    let { redirectPath } = this.props.userStatus

    if (redirectPath) {
      return <Redirect to={redirectPath}></Redirect>
    }

    return (
      <div>
        <NavBar back={null} style={{ background: '#5dd5c8', color: 'white' }} className="css-reglog-navbar">BOSS直聘</NavBar>
        <Logo></Logo>
        <Form layout='horizontal' style={{ marginTop: '181px' }}>
          {/* <Space direction='vertical'> */}
          <Form.Item label='用户名'>
            {/* val可以直接获取输入框数据 */}
            <Input placeholder='请输入用户名' clearable onChange={(val) => this.handleChange('username', val)} />
          </Form.Item>
          <Form.Item label='密码'>
            <Input placeholder='请输入密码' clearable type='password' onChange={(val) => { this.handleChange('password', val) }} />
          </Form.Item>
          {/* </Space> */}
          <Space direction='vertical' block style={{ marginTop: '30px' }}>
            <Button block style={{ background: '#5dd5c8', color: 'white', height: '49.5px' }} onClick={this.handleLogin}>登录</Button>
            <Button block style={{ height: '49.5px' }} onClick={() => { this.props.history.push('/register') }}>还没有账号？注册</Button>
          </Space>
        </Form>
      </div>
    )
  }
}

export default connect(
  state => ({ userStatus: state.userStatus }),
  { login, clearUserStatus }
)(Login)