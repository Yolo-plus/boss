import { combineReducers } from 'redux'
import { AUTH_SUCCESS, AUTH_FAIL, UPDATE_SUCCESS, UPDATE_FAIL, LIST_SUCCESS, CLEAR_USER_STATUS, CHAT_LIST_SUCCESS, SAVE_NEW_MSG, READ_SUCCESS } from './action-types'
import { getRedirectPath } from '../utils/handlePath'

let initUser = {}

// 保存状态
function userStatus(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      let { type, header } = action.data
      return { ...action.data, redirectPath: getRedirectPath(type, header) }  // 授权成功
    case AUTH_FAIL:
      return { msg: action.data }  // 授权失败
    case UPDATE_SUCCESS:
      return action.data  // 更新成功
    case UPDATE_FAIL:
      return { msg: action.data }  // 更新失败
    case CLEAR_USER_STATUS:
      return { msg: '' }  // 清空数据
    default:
      return state
  }
}

// userList
function userLists(state = [], action) {
  switch (action.type) {
    case LIST_SUCCESS:
      return action.data  // 获取用户列表成功
    default:
      return state
  }
}

// 消息列表
function chatList(state = {}, action) {
  switch (action.type) {
    case CHAT_LIST_SUCCESS:
      return action.data
    case SAVE_NEW_MSG:
      let obj = {...state}
      obj.chatMsgs.push(action.data)
      return obj
    default:
      return state
  }
}

// 将消息标记已读
function readMsg(state=0, action) {
  switch (action.type) {
    case READ_SUCCESS:
      return action.data
    default:
      return state
  }
}

export default combineReducers({
  userStatus,
  userLists,
  chatList,
  readMsg
})