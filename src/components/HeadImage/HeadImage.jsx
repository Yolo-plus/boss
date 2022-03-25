import React, { Component } from 'react'

export default class HeadImage extends Component {
  constructor (props) {
    super(props)

    this.headlist = []

    for (let i = 1; i <= 5; i++) {
      // 使用require获得头像
      this.headlist.push({
        name: `头像${i}`,
        icon: require(`../../assets/images/头像${i}.png`)
      })
    }
  }

  render() {
    let icon = this.headlist.find(item => item.name === this.props.head) || {icon: require('./images/block.webp')}

    return (
      <div>
        <img src={icon.icon} alt="" width='96'/>
      </div>
    )
  }
}