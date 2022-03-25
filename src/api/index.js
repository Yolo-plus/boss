import ajax from './ajax'

export const reqRegister = (user) => ajax('/register', user, 'POST')
export const reqLogin = (user) => ajax('/login', user, 'POST')
export const userUpdate = (detail) => ajax('/update', detail, 'POST')  // 更新用户信息（完善步骤）
export const getUserInfo = () => ajax('/user')  // 根据cookie获取用户信息
export const getUserList = (type) => ajax('/userlist', {type})  // 获取BOSS或者求职者列表
export const getChatList = () => ajax('/msglist')  // 获取消息列表
export const clearMsg = (from) => ajax('/readmsg', {from}, 'POST')  // 清除未读