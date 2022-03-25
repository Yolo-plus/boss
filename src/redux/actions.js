import { AUTH_SUCCESS, AUTH_FAIL, UPDATE_SUCCESS, UPDATE_FAIL, LIST_SUCCESS, CLEAR_USER_STATUS, CHAT_LIST_SUCCESS, SAVE_NEW_MSG, READ_SUCCESS } from "./action-types"
import { reqRegister, reqLogin, userUpdate, getUserInfo, getUserList, getChatList, clearMsg } from '../api/index'
import io from 'socket.io-client'

// 同步的动作（授权成功/失败）
const authSuccess = (data) => ({ type: AUTH_SUCCESS, data: data })
const authFail = (data) => ({ type: AUTH_FAIL, data: data })
const updateSuccess = (detail) => ({ type: UPDATE_SUCCESS, data: detail })
export const updateFail = (detail) => ({ type: UPDATE_FAIL, data: detail })
const ListSuccess = (data) => ({ type: LIST_SUCCESS, data: data })
export const clearUserStatus = () => ({ type: CLEAR_USER_STATUS })  // 显示注册或者登录失败后清空userStatus内的数据
const Chat_List = (data) => ({ type: CHAT_LIST_SUCCESS, data: data })
const saveNewMsg = (data) => ({ type: SAVE_NEW_MSG, data: data })
const readMsgs = (data) => ({ type: READ_SUCCESS, data: data })

// 注册
export const register = (data) => {
  let { username, password1, type } = data
  let password = password1

  return async dispatch => {
    // 传入的是对象，不是一个一个的变量！
    let res = await reqRegister({ username, password, type })

    // 成功与否
    if (res.data.code === 0) {
      chatList(dispatch, res.data.data._id)
      dispatch(authSuccess(res.data.data))
    } else {
      dispatch(authFail(res.data.msg))
    }
  }
}

// 登录
export const login = (data) => {
  return async dispatch => {
    let res = await reqLogin(data)  // 因为返回的是Promise所以可以使用await，并不是因为有async才能使用await，async只是附加条件

    if (res.data.code === 0) {
      chatList(dispatch, res.data.data._id)
      dispatch(authSuccess(res.data.data))
    } else {
      dispatch(authFail(res.data.msg))
    }
  }
}

// 更新：异步动作
export const update = (detail) => {
  return async dispatch => {
    let res = await userUpdate(detail)

    if (res.data.code === 0) {
      dispatch(updateSuccess(res.data.data))  // 传递返回的数据
    } else {
      dispatch(updateFail(res.data.msg))
    }
  }
}

// 根据cookie获取用户信息
export const getUser = () => {
  return async dispatch => {
    let res = await getUserInfo()

    if (res.data.code === 0) {
      chatList(dispatch, res.data.data._id)
      dispatch(updateSuccess(res.data.data))  // 保存到redux
    } else {
      dispatch(updateFail(res.data.msg))
    }
  }
}

// 获取用户列表
export const userList = (type) => {
  return async dispatch => {
    let res = await getUserList(type)

    if (res.data.code === 0) {
      dispatch(ListSuccess(res.data.data))
    }
  }
}

// 封装连接方法，监听接受消息
function socConnect(dispatch, user_id) {
  if (!io.socket) {
    // websocket协议
    io.socket = io('ws://localhost:5000')

    io.socket.on('receiveMsg', function (data) {
      // 发送消息后服务器返回的消息，如果当前是接收方或者发送方则接受消息
      if (data.from === user_id || data.to === user_id) {
        dispatch(saveNewMsg(data))
      }
    })
  }
}

// 点击发送的时候发送消息
export const sendMsg = ({ from, to, content }) => {
  return async () => {
    // 连接socket.io
    // socConnect()

    io.socket.emit('sendMsg', { from, to, content })
  }
}

// 获取用户消息列表
async function chatList(dispatch, user_id) {
  socConnect(dispatch, user_id)
  let res = await getChatList()

  if (res.data.code === 0) {
    dispatch(Chat_List(res.data.data))
  }
}

// 将消息标记已读
export const readMsg = (from) => {
  return async dispatch => {
    let res = await clearMsg(from)

    if (res.data.code === 0) {
      dispatch(readMsgs(res.data.data))
    }
  }
}