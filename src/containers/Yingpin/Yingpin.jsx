import React, { Component } from 'react'
import { NavBar, Form, Input, Button, TextArea, Toast } from 'antd-mobile'
import HeadSelect from '../../components/HeadSelect/HeadSelect'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/actions'

class Yingpin extends Component {
  state = {
    job: '',
    introduction: '',
    head: ''
  }

  handleChnage = (name, value) => {
    this.setState({[name]: value})
  }

  setHead = (name) => {
    this.setState({head: name})
  }

  // 更新用户信息
  userUpdate = () => {
    let header = this.state.head
    let post = this.state.job
    let info = this.state.introduction

    if (!header) {
      Toast.show({
        content: '请选择头像'
      })

      return;
    } else if (!post) {
      Toast.show({
        content: '请输入求职岗位'
      })

      return;
    } else if (!info) {
      Toast.show({
        content: '请输入个人介绍'
      })

      return;
    }

    this.props.update({header, post, info})
  }

  render() {
    let { type, header } = this.props.userStatus

    // 当信息完善的时候进入到yingpinpage或者zhaopinpage，用来填写过后跳转
    if (header) {
      let path = type === 'yingpin' ? '/yingpinpage' : 'zhaopinpage'
      return <Redirect to={path}></Redirect>
    }

    return (
      <div>
        <NavBar back={null} className="css-yingpin-navbar" style={{ background: '#5dd5c8', color: 'white' }}>信息完善</NavBar>
        <HeadSelect setHead={this.setHead}></HeadSelect>
        <Form layout='horizontal'>
          {/* <Space direction='vertical'> */}
          <Form.Item label='求职岗位'>
            {/* val可以直接获取输入框数据 */}
            <Input placeholder='请输入求职岗位' clearable onChange={(val) => {this.handleChnage('job', val)}}/>
          </Form.Item>
          <Form.Item label='个人介绍'>
            <TextArea placeholder='请输入个人介绍' autoSize={{ minRows: 1, maxRows: 3}} onChange={(val) => {this.handleChnage('introduction', val)}}/>
          </Form.Item>
          {/* </Space> */}
          <Button block style={{ background: '#5dd5c8', color: 'white', height: '49.5px', marginTop: '30px' }} onClick={this.userUpdate}>保存</Button>
        </Form>
      </div>
    )
  }
}

export default connect(
  state => ({userStatus: state.userStatus}),
  {update}
)(Yingpin)