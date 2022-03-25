import React, { Component } from 'react'
import { Card,List } from 'antd-mobile'
import HeadImage from '../HeadImage/HeadImage'
import { withRouter } from 'react-router-dom'

class Lists extends Component {
  render() {
    let userLists = this.props.userLists

    return (
      <div className='css-list-root'>
        {
          userLists.map(item => {
            return (
              <Card
                className='css-list-card'
                title={
                  <div className="css-list">
                    <HeadImage head={item.header}></HeadImage>
                    <span>{item.username}</span>
                  </div>
                }
                key={item._id}
                onBodyClick={() => {this.props.history.push(`/chat/${item._id}`)}}
                onHeaderClick={() => {this.props.history.push(`/chat/${item._id}`)}}
              >
                <List>
                  {item.type === 'yingpin' ? <List.Item className='css-personal'>求职岗位：{item.post}</List.Item> : <List.Item className='css-personal'>招聘岗位：{item.post}</List.Item>}
                  {item.type === 'yingpin' ? <List.Item className='css-personal'>个人介绍：{item.info}</List.Item> : <List.Item className='css-personal'>公司名称：{item.company}</List.Item>}
                  {item.type === 'yingpin' ? '' : <List.Item className='css-personal'>职位薪资：{item.salary}</List.Item>}
                  {item.type === 'yingpin' ? '' : <List.Item className='css-personal'>职位要求：{item.info}</List.Item>}
                </List>
                
              </Card>
            )
          })
        }


      </div>
    )
  }
}

export default withRouter(Lists)
