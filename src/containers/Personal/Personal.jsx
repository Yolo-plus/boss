import React, { Component } from 'react'
import { Result, List, Button, Dialog } from 'antd-mobile'
import { connect } from 'react-redux'
import HeadImage from '../../components/HeadImage/HeadImage'
import Cookies from 'js-cookie'
import { updateFail } from '../../redux/actions'

class Personal extends Component {
  render() {
    let userStatus = this.props.userStatus

    return (
      <div>
        <Result
          icon={<HeadImage head={userStatus.header} />}
          status='success'
          title={userStatus.username}
          description=''
        />
        <List header='相关信息'>
          {userStatus.type === 'yingpin' ? <List.Item className='css-personal'>求职岗位：{userStatus.post}</List.Item> : <List.Item className='css-personal'>招聘岗位：{userStatus.post}</List.Item>}
          {userStatus.type === 'yingpin' ? <List.Item className='css-personal'>个人介绍：{userStatus.info}</List.Item> : <List.Item className='css-personal'>公司名称：{userStatus.company}</List.Item>}
          {userStatus.type === 'yingpin' ? '' : <List.Item className='css-personal'>职位薪资：{userStatus.salary}</List.Item>}
          {userStatus.type === 'yingpin' ? '' : <List.Item className='css-personal'>职位要求：{userStatus.info}</List.Item>}
        </List>
        <Button
          // color='danger'
          block
          style={{ marginTop: '32px', height: '49.5px', background: 'rgb(244, 244, 244)', color: 'red' }}
          onClick={async () => {
            const result = await Dialog.confirm({
              content: '确认退出？',
            })

            if (result) {
              Cookies.remove('userid')
              // 直接调用同步动作清除redux
              this.props.updateFail('')
            }
          }}
        >
          退出
        </Button>
      </div>
    )
  }
}

export default connect(
  state => ({ userStatus: state.userStatus }),
  { updateFail }
)(Personal)
