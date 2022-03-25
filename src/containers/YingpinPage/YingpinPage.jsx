import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userList } from '../../redux/actions'
import Lists from '../../components/List/List'

class YingpinPage extends Component {
  componentDidMount () {
    this.props.userList('zhaopin')
  }

  render() {
    return (
      <div>
        <Lists userLists={this.props.userLists}></Lists>
      </div>
    )
  }
}

export default connect(
  state => ({userLists: state.userLists}),
  { userList }
)(YingpinPage)
