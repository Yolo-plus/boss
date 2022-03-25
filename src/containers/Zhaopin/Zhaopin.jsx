import React, { Component } from 'react'
import { NavBar, Form, Input, Button, Toast } from 'antd-mobile'
import HeadSelect from '../../components/HeadSelect/HeadSelect'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/actions'

class Zhaopin extends Component {
  state = {
    job: '',
    company: '',
    salary: '',
    basic: '',
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
    let company = this.state.company
    let salary = this.state.salary
    let info = this.state.basic

    if (!header) {
      Toast.show({
        content: '请选择头像'
      })

      return;
    } else if (!post) {
      Toast.show({
        content: '请输入招聘岗位'
      })

      return;
    } else if (!company) {
      Toast.show({
        content: '请输入公司名称'
      })

      return;
    } else if (!salary) {
      Toast.show({
        content: '请输入职位薪资'
      })

      return;
    } else if (!info) {
      Toast.show({
        content: '请输入职位要求'
      })

      return;
    }

    this.props.update({header, post, company, salary, info})
  }

  render() {
    let { type, header } = this.props.userStatus
    if (header) {
      let path = type === 'yingpin' ? '/yingpinpage' : 'zhaopinpage'
      return <Redirect to={path}></Redirect>
    }

    return (
      <div>
        <NavBar back={null} className="css-zhaopin-navbar" style={{ background: '#5dd5c8', color: 'white' }}>信息完善</NavBar>
        <HeadSelect setHead={this.setHead}></HeadSelect>
        <Form layout='horizontal'>
          {/* <Space direction='vertical'> */}
          <Form.Item label='招聘岗位'>
            {/* val可以直接获取输入框数据 */}
            <Input placeholder='请输入招聘岗位' clearable onChange={(val) => {this.handleChnage('job', val)}}/>
          </Form.Item>
          <Form.Item label='公司名称'>
            {/* val可以直接获取输入框数据 */}
            <Input placeholder='请输入公司名称' clearable onChange={(val) => {this.handleChnage('company', val)}}/>
          </Form.Item>
          <Form.Item label='职位薪资'>
            {/* val可以直接获取输入框数据 */}
            <Input placeholder='请输入职位薪资' clearable onChange={(val) => {this.handleChnage('salary', val)}}/>
          </Form.Item>
          <Form.Item label='职位要求'>
            {/* val可以直接获取输入框数据 */}
            <Input placeholder='请输入职位要求' clearable onChange={(val) => {this.handleChnage('basic', val)}}/>
          </Form.Item>
          {/* </Space> */}
          <Button block style={{ background: '#5dd5c8', color: 'white', height: '49.5px', marginTop: '50.5px' }} onClick={this.userUpdate}>保存</Button>
        </Form>
      </div>
    )
  }
}

export default connect(
  state => ({userStatus: state.userStatus}),
  {update}
)(Zhaopin)